import * as React from 'react'

import { Menu } from './Menu'

type ItemProps = {
  isSet: boolean
  text: string
  onClick: () => void
}

type ItemMenu = {
  items: { key: number; text: string; view: JSX.Element }[]
  selected: number
  setSelected: (_: number) => void
}

export const Item = ({ isSet, text, onClick }: ItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center h-full px-5 border-b ${
      isSet ? 'border-third' : 'border-transparent'
    }`}
  >
    {text}
  </div>
)

export const ItemMenu = ({ items = [], selected, setSelected }: ItemMenu) => (
  <Menu>
    {items.map((item) => (
      <Item
        key={item.key}
        text={item.text}
        isSet={selected == item.key}
        onClick={() => setSelected(item.key)}
      ></Item>
    ))}
  </Menu>
)
