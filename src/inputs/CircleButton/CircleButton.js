import React from "react"
import "./circleButton.scss"

export default function CircleButton({
  onClick,
  isActive,
  fontIcon = "circle"
}) {
  return (
    <button className='circle-button' onClick={onClick}>
      <span className={isActive ? "active" : ""}>
        <i className={`fa fa-${fontIcon}`} aria-hidden='true'></i>
      </span>
    </button>
  )
}
