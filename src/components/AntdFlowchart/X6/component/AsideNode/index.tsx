import React, { useRef, useImperativeHandle } from 'react'
import { Addon, Graph } from '@antv/x6'
import { 
  groups, 
  charts, 
  nodes, 
  imageNodes,
} from '../../defaultNode'

import { 
  initializeChart, 
  createNode, 
} from '../../preparation'

const AsideNode = React.forwardRef((props, ref) => {
  const stencil = useRef(null) // 侧边栏容器
  const minimapContainer = useRef(null) // 小地图容器

  useImperativeHandle(ref, () => ({
    initAside: (graph:Graph) => {
      const stencilObj = new Addon.Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 300,
        stencilGraphHeight: 180,
        // collapsable: true,
        groups,
        layoutOptions: {
          columns: 3,
          columnWidth: 90,
          rowHeight: 55,
        },
        search: (cell, keyword, groupName, stencil) => {
          if (keyword) {
            return cell.label.includes(keyword)
          }
          return true
        }
      })
      stencil.current.appendChild(stencilObj.container)
      
      initializeChart(charts)
  
      stencilObj.load(createNode(graph, nodes), 'group1')
  
      stencilObj.load(createNode(graph, imageNodes), 'group2')

      
    },
    minimapContainer,
    stencil,
  }))

  return <aside>
    <section style={{width: '300px', height: '78%', position: 'relative'}} ref={stencil} />
    <section style={{width: '300px', height: '22%'}} ref={minimapContainer} />
  </aside>
})

export default AsideNode
