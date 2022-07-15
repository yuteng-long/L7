import React from 'react'
import { Tooltip, Button, ButtonProps } from 'antd'

const TooltipButton = ({title, buttonProps}:{title:string,buttonProps:ButtonProps}) => {
  return <Tooltip title={title}>
    <Button {...buttonProps} />
  </Tooltip>
}

export default TooltipButton
