import AceEditor from 'react-ace'

import '../lib/ace/theme-grammar'
import '../lib/ace/mode-grammar'
import '../css/code.css'

import { Menu } from './Menu'

export const Code = ({ setCode }: { setCode: (_: string) => void }) => {
  return (
    <div>
      <Menu>
        <div className="px-5">LR(1) Machine</div>
      </Menu>
      <div className="w-72 text-3xl bg-main h-full p-2 py-5">
        <AceEditor
          mode="grammar"
          theme="grammar"
          width="100%"
          height="100%"
          onChange={setCode}
          fontSize="15px"
          setOptions={{
            fontFamily: 'Fira Code',
          }}
        />
      </div>
    </div>
  )
}
