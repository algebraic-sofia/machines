import { Grammar, Rule, Term } from './grammar'
import { cloneJSet, hashify, insert, JSet, mkJSet, toArr } from './set'

// Closure

type LR0Item = {
  rule: Rule
  idx: number
}

const startRule = (rule: Rule): LR0Item => ({
  rule,
  idx: 0,
})

const nextItem = ({ rule, idx }: LR0Item): LR0Item => ({
  rule,
  idx: idx + 1,
})

const getLocus = (item: LR0Item): Term | null => item.rule.terms[item.idx]

const closure = (grammar: Grammar, items: JSet<LR0Item>): JSet<LR0Item> => {
  let lastSize = -1
  let result = cloneJSet(items)
  while (lastSize != result.wrap.size && lastSize < 1000) {
    lastSize = result.wrap.size
    for (let item of result) {
      let locus = getLocus(item)
      if (locus?.type == 'non-terminal') {
        let rules = grammar.rules.filter((rule) => rule.label == locus?.value)
        for (let rule of rules) insert(result, startRule(rule))
      }
    }
  }
  return result
}

const goto = (
  grammar: Grammar,
  items: JSet<LR0Item>,
  term: string
): JSet<LR0Item> => {
  let result: JSet<LR0Item> = mkJSet()
  for (let item of items) {
    if (getLocus(item)?.value == term) {
      insert(result, nextItem(item))
    }
  }
  return closure(grammar, result)
}

const compileGrammar = (grammar: Grammar): Map<number, Map<string, string>> => {
  type State = JSet<LR0Item>

  let initial: JSet<LR0Item> = mkJSet()
  insert(initial, startRule(grammar.rules[0]))

  let c = closure(grammar, initial)
  let t: JSet<State> = mkJSet()
  insert(t, c)

  let e: JSet<[State, Term, State]> = mkJSet()

  let lastSize = -1

  while (lastSize != t.wrap.size + e.wrap.size) {
    lastSize = t.wrap.size + e.wrap.size
    for (let state of t) {
      if (state.wrap) state = mkJSet([...state.wrap])

      for (let prod of state) {
        let locus = getLocus(prod)
        if (locus) {
          let j = goto(grammar, state, locus.value)
          insert(t, j)
          insert(e, [state, locus, j])
        }
      }
    }
  }

  let resTable = new Map<number, Map<string, string>>()

  let counter = 0
  let setted = new Map<number, number>()

  let values = [...e.wrap.values()]

  let getState = (state: JSet<LR0Item>): number => {
    let hash = hashify(state)
    let res = setted.get(hash)
    if (res) return res
    setted.set(hashify(state), counter++)
    resTable.set(counter - 1, new Map())
    return counter - 1
  }

  values.forEach(([b, e, f]) => {
    let bC = getState(b)
    let fC = getState(f)
    if (e.type == 'terminal' && e.value != '$') {
      resTable.get(bC)?.set(e.value, 'shift ' + fC)
    } else if (e.type == 'terminal') {
      resTable.get(bC)?.set(e.value, 'accept')
    } else {
      resTable.get(bC)?.set(e.value, 'goto ' + fC)
    }
  })

  for (let state of t) {
    for (let prod of state) {
      let locus = getLocus(prod)
      if (!locus) {
        let bC = getState(state)

        let js: JSet<LR0Item> = mkJSet()
        insert(js, prod)

        let prodCo = getState(js)

        for (let terminal of grammar.terminals) {
          resTable.get(bC)?.set(terminal, 'red ' + prodCo)
        }
      }
    }
  }

  return resTable
}

export type { LR0Item, JSet }
export { closure, startRule, compileGrammar }
