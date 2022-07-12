import React from 'react'
import { CollapsePanelProps } from 'antd'
import { common, dev, prod } from './content/content'
import ReactMonacoEditor from 'react-monaco-editor'
const panelObj:Array<CollapsePanelProps> = [
  {
    header: 'webpack_common',
    key: 1,
    children: <ReactMonacoEditor language="typescript" theme="vs-dark" height={500} value={common} />
  },
  {
    header: 'webpack_dev',
    key: 2,
    children: <ReactMonacoEditor language="typescript" theme="vs-dark" height={500} value={dev} />
  },
  {
    header: 'webpack_prod',
    key: 3,
    children: <ReactMonacoEditor language="typescript" theme="vs-dark" height={500} value={prod} />
  }
]

export default panelObj
