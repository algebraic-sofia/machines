type Term = { type: 'terminal' | 'non-terminal'; value: string }

type Rule = {
  label: string
  terms: Term[]
}

type Grammar = {
  terminals: Set<string>
  nonTerminals: Set<string>
  declaratedTerms: Set<string>
  rules: Rule[]
}

const assert = <T>(expected: T, got: T) => {
  if (expected != got) {
    throw new Error(`Expected ${expected} but instead got ${got}`)
  }
}

const isNonTerminal = (str: string): boolean => str[0].match(/[A-Z]/) != null

const mkTerm = (str: string): Term => ({
  type: isNonTerminal(str) ? 'non-terminal' : 'terminal',
  value: str,
})

const parseGrammar = (str: string): Grammar => {
  const lines = str.split('\n').filter(Boolean)

  const declaratedTerms: Set<string> = new Set([])
  const terminals: Set<string> = new Set([])
  const nonTerminals: Set<string> = new Set([])

  const rules = lines.map((line) => {
    // Split by space and remove all trailing space to a better analysis
    let rawTerms = line
      .split(' ')
      .map((a) => a.trim())
      .filter(Boolean)

    // Assert that the second argument is a arrow
    assert('->', rawTerms[1])

    declaratedTerms.add(rawTerms[0])

    let terms = rawTerms.slice(2).map(mkTerm)

    terms.forEach((term) =>
      term.type == 'non-terminal'
        ? nonTerminals.add(term.value)
        : terminals.add(term.value)
    )

    return { label: rawTerms[0], terms }
  })

  return {
    nonTerminals,
    terminals,
    declaratedTerms,
    rules,
  }
}

export { parseGrammar }
export type { Grammar, Rule, Term }
