import React from "react"
import "./iconButton.scss"

export default function IconButton({ icon, size = 20, ...rest }) {
  return (
    <i
      {...rest}
      className={`fa fa-${icon} icon-button`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        fontSize: `${size}px`
      }}
    ></i>
  )
}
