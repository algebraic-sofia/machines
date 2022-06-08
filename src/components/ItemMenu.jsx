import * as React from 'react'

import { Menu } from './Menu'

export const Item = ({ isSet, text, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center h-full px-5 border-b ${
      isSet ? 'border-third' : 'border-transparent'
    }`}
  >
    {text}
  </div>
)

export const ItemMenu = ({ items = [], selected, setSelected }) => (
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
