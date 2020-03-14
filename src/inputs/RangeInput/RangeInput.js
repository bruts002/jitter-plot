import React from "react"
import "./rangeInput.scss"

const MIN = "MIN"
const MAX = "MAX"

export default function RangeInput({
  min,
  max,
  lowerBound,
  upperBound,
  onChange,
  step = Math.round((max - min) / 10),
  resizerWidth = 10
}) {
  const scale = 100 / (max - min)
  const startWidth = (lowerBound - min) * scale
  const endWidth = (max - upperBound) * scale
  const middleWidth = (upperBound - lowerBound) * scale
  const [dragging, setDragging] = React.useState(false)

  function startDrag(control, e) {
    setDragging({
      control,
      start: e.clientX,
      pxValue:
        (+max - +min) / e.target.parentElement.getBoundingClientRect().width
    })
  }

  React.useEffect(() => {
    if (dragging && dragging.start) {
      function moveListener(e) {
        const distanceMoved = -1 * (dragging.start - +e.clientX)
        const unitsMoved = distanceMoved * dragging.pxValue

        const newValue =
          dragging.control === MIN
            ? {
                upperBound,
                lowerBound: Math.min(
                  Math.max(min, lowerBound + unitsMoved),
                  upperBound
                )
              }
            : {
                lowerBound,
                upperBound: Math.max(
                  Math.min(max, upperBound + unitsMoved),
                  lowerBound
                )
              }

        onChange(newValue)
      }
      function mouseUpListener(e) {
        setDragging(null)
        window.removeEventListener("mousemove", moveListener)
        window.removeEventListener("mouseup", mouseUpListener)
      }
      window.addEventListener("mousemove", moveListener)
      window.addEventListener("mouseup", mouseUpListener)
    }
  }, [dragging])

  return (
    <div className='range__container'>
      <div className='range__inputs'>
        <input
          type='number'
          onChange={e =>
            onChange({
              lowerBound: +e.target.value,
              upperBound
            })
          }
          step={step}
          value={lowerBound}
          max={Math.min(max, upperBound)}
          min={min}
        />
        <input
          type='number'
          onChange={e =>
            onChange({
              upperBound: +e.target.value,
              lowerBound
            })
          }
          step={step}
          value={upperBound}
          max={max}
          min={Math.max(min, lowerBound)}
        />
      </div>
      <div className='range__slider'>
        <div
          className='range__chunk range__chunk--start'
          style={{ flexBasis: `${startWidth}%` }}
        ></div>
        <div
          className='range__control'
          onMouseDown={e => startDrag(MIN, e)}
          style={{ flexBasis: `${resizerWidth}px` }}
        ></div>
        <div
          className='range__chunk range__chunk--middle'
          style={{ flexBasis: `calc(${middleWidth}% - ${2 * resizerWidth}px` }}
        ></div>
        <div
          className='range__control'
          onMouseDown={e => startDrag(MAX, e)}
          style={{ flexBasis: `${resizerWidth}px` }}
        ></div>
        <div
          className='range__chunk range__chunk--end'
          style={{ flexBasis: `${endWidth}%` }}
        ></div>
      </div>
    </div>
  )
}
