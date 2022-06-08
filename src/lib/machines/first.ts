import { Grammar, Term } from './grammar'

const joinSets = <A>(...sets: Set<A>[]): Set<A> => {
  let res: Set<A> = new Set([])
  sets.forEach((set) => Array.from(set).forEach((term) => res.add(term)))
  return res
}

const getFirstTable = (grammar: Grammar): Map<string, Set<string>> => {
  let nullable: Set<string> = new Set([])
  let first = new Map(Array.from(grammar.terminals).map((k) => [k, new Set(k)]))

  let areNullable = (arr: Term[], from: number = 0, to: number = arr.length) =>
    arr.slice(from, to).every((term) => nullable.has(term.value))

  let modified = true

  while (modified) {
    modified = false

    for (let rule of grammar.rules) {
      if (rule.terms.length == 0 || areNullable(rule.terms))
        nullable.add(rule.label)

      for (let i = 0; i < grammar.rules.length; i++) {
        if (i == 0 || areNullable(rule.terms, 0, i)) {
          let entry = first.get(rule.label) || new Set()
          let newOnes = first.get(rule.terms[i]?.value) || new Set()
          let result = joinSets(entry, newOnes)
          first.set(rule.label, result)

          modified ||= result.size != entry.size
        }
      }
    }
  }

  return first
}

export { getFirstTable }
