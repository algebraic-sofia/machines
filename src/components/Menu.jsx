import * as React from 'react'

export const Menu = ({ children }) => (
  <div className="flex w-full h-12 bg-main border-b border-gray-900 flex items-center text-white">
    {children}
  </div>
)
