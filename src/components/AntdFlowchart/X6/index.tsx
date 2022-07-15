import React, { useRef, useEffect } from 'react'
import { Graph } from '@antv/x6';
import styles from '../index.css'
import { graphEvent } from './preparation'
import { defaultOptions } from './defaultNode'
import GraphMode from './component/Graph'
import AsideNode from './component/AsideNode'
import { Options } from '@antv/x6/lib/graph/options';

interface graph {
  current: {
    initGraph:(graphConfig:Partial<Options.Manual>)=>Graph,
    container: HTMLElement
  };
}

const AntdFlowchart = () => {
  const aside = useRef(null) // 侧边栏容器
  const globalgraph:graph = useRef(null) // 流程对象

  useEffect(() => {
    const { initGraph, container } = globalgraph.current
    const { initAside, minimapContainer } = aside.current
    const graph = initGraph({
      minimap: {
        enabled: true,
        container: minimapContainer.current,
      },
      ...defaultOptions
    });
    initAside(graph) // 加载侧边栏
    graphEvent(graph, container)
    return () => {
      graph.dispose()
    }
  })
  return <article className={styles.containerstyle}>
    <AsideNode ref={aside} />
    <GraphMode ref={globalgraph} />
  </article> 
}

export default AntdFlowchart
