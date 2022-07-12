import React, { Attributes } from 'react'
import { Collapse, CollapsePanelProps } from 'antd'

const { Panel } = Collapse;

interface CollapseAutomaticProps {
  displayObj:Array<CollapsePanelProps>
}

const CollapseAutomatic = ({displayObj}:CollapseAutomaticProps) => {
  return <Collapse accordion>
    {
      displayObj.map((panelPprops: CollapsePanelProps) => {
        return <Panel {...panelPprops} />
      })
    }
  </Collapse>
}

export default CollapseAutomatic
