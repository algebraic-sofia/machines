import { useState } from 'react'

import { Code } from './Code'
import { View } from './View'

export const App = () => {
  let [code, setCode] = useState('')

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="grow flex h-full overflow-hidden bg-sec">
        <Code setCode={setCode} />
        <View code={code} />
      </div>
    </div>
  )
}
