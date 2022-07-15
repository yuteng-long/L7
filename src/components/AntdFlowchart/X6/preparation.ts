/**
 * 图形准备工作包括初始化图形、图形事件等
 */

import { Graph, Node } from "@antv/x6"

interface charts {
  [key:string]:Node.Definition | (Node.Config & {inherit?: string | Node.Definition | undefined})
}

/**
 * @description 初始化图形
 * @param graph Graph实例对象
 * @param charts 图形对象
 */
export const initializeChart = (charts:charts) => {
  const chartsKey = Object.keys(charts)
  chartsKey.forEach((key:string) => {
    Graph.registerNode(key, charts[key], true) // 初始化图形
  })
}

/**
 * @description 添加节点
 * @param graph Graph实例
 * @param nodes 要创建的图标节点
 */
export const createNode = (graph:Graph, nodes:Array<Node.Metadata>):Array<Node<Node.Properties>> => {
  return nodes.map(item => {
    return graph.createNode(item)
  })
}

/**
 * @description 添加事件
 * @param graph Graph实例
 * @param container graph容器
 */
export const graphEvent = (graph:Graph, container:HTMLElement) => {

  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.cut(cells)
    }
    return false
  })
  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
  //undo redo
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.history.canUndo()) {
      graph.history.undo()
    }
    return false
  })
  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.history.canRedo()) {
      graph.history.redo()
    }
    return false
  })
  // select all
  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes()
    if (nodes) {
      graph.select(nodes)
    }
  })
  //delete
  graph.bindKey('delete', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })
  // zoom
  graph.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.zoom()
    if (zoom < 1.5) {
      graph.zoom(0.1)
    }
  })
  graph.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.zoom()
    if (zoom > 0.5) {
      graph.zoom(-0.1)
    }
  })
  graph.on('node:mouseenter', () => {
    const getcontainer = container!
    const ports = getcontainer.querySelectorAll(
      '.x6-port-body',
    ) as NodeListOf<SVGElement>
    showPorts(ports, true)
  })
  graph.on('node:mouseleave', () => {
    const getcontainer = container!
    const ports = getcontainer.querySelectorAll(
      '.x6-port-body',
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
  })
  
  graph.on('cell:dblclick', ({ cell, e }) => {
    const isNode = cell.isNode()
    const name = cell.isNode() ? 'node-editor' : 'edge-editor'
    cell.removeTool(name)
    cell.addTools({
      name,
      args: {
        event: e,
        attrs: {
          backgroundColor: isNode ? '#EFF4FF' : '#FFF',
        },
      },
    })
  })
}

