/**
 * webapck 配置注意点
*/
import React, { ComponentType } from 'react'
import CollapseAutomatic from '../../components/CollapseAutomatic'
import panelObj from './panelObj'

const WebpackAttention = () => {
  return <CollapseAutomatic displayObj={panelObj} />
}

export default WebpackAttention
