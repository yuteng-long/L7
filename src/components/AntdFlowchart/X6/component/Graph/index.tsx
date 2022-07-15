import React, { useRef, useImperativeHandle, useState } from 'react'
import { Graph } from '@antv/x6'
import { Options } from '@antv/x6/lib/graph/options'

const GraphMode = React.forwardRef((props, ref) => {
  const container = useRef(null) // 流程图容器
  const [ visible, setVisible ] = useState(false)
  useImperativeHandle(ref, () => ({
    initGraph: (graphConfig:Partial<Options.Manual>):Graph => {
      const graph = new Graph({
        container: container.current,
        ...graphConfig
      });
      return graph
    },
    container: container.current
  }))

  const mousemove = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
    if(e.clientY < 50){
      !visible && setVisible(true)
    }else{
      visible && setVisible(false)
    }
  }

  const mouseLeave = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
    visible && setVisible(false)
  }

  return <article 
    onMouseMove={mousemove} 
    onMouseLeave={mouseLeave}
    style={{ flex: 1, position: 'relative',overflow:'hidden' }}
  >
    <section style={{width: '100%', height: '100%'}} ref={container} /> 
  </article>
})

export default GraphMode
