import * as React from 'react'
import { useRef, useState } from 'react'

import { ItemMenu } from './ItemMenu'

import { First } from './tables/First'
import { GotoAction } from './tables/GotoAction'

import { Grammar, parseGrammar } from '../lib/machines/grammar'
import { getFirstTable } from '../lib/machines/first'

import { compileGrammar } from '../lib/machines/lr0'

export const View = ({ code = '' }: { code: string }) => {
  const [selected, setSelected] = useState(0)

  let firstData: { symbol: string; symbols: Set<string> }[] = []
  let grammar: Grammar | null = null
  let grammarC: Map<number, Map<string, string>> | null = null

  try {
    grammar = parseGrammar(code)
    const firstTable = getFirstTable(grammar)

    firstData = Array.from(firstTable).map(([symbol, symbols]) => ({
      symbol,
      symbols,
    }))

    if (grammar.rules[0]) {
      grammarC = compileGrammar(grammar)
    }
  } catch (err) {
    console.log(err)
  }

  const items = [
    { key: 1, text: 'First Table', view: <First data={firstData} /> },
  ]

  let data = [...(grammarC?.entries() || new Map())].map(([k, v]) => {
    let res: Record<string, any> = Object.fromEntries(v)
    res['state'] = k
    return res
  })

  items.push({
    key: 1,
    text: 'Table',
    view: (
      <GotoAction
        nonTerminals={[...(grammar?.nonTerminals || new Set())]}
        terminals={[...(grammar?.terminals || new Set())]}
        data={data}
      />
    ),
  })

  return (
    <div className="w-full overflow-scroll">
      <ItemMenu
        items={items}
        selected={selected}
        setSelected={setSelected}
      ></ItemMenu>
      <div className="p-5 overflow-scroll">{items[selected].view}</div>
    </div>
  )
}
