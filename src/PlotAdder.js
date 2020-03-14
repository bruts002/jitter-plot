import React from "react"

function normalize(str) {
  return str.replace(/\W/, "-")
}

function makeId(str) {
  return normalize(`plot-${str}`)
}

export default function PlotAdder({
  metrics,
  selectedMetrics,
  delPlot,
  addPlot
}) {
  return (
    <>
      <h3>Metrics</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {metrics.map(metric => (
          <li key={metric} style={{ padding: 10 }}>
            <input
              type='checkbox'
              name={makeId(metric)}
              id={makeId(metric)}
              checked={selectedMetrics.includes(metric)}
              onChange={e =>
                e.target.checked ? addPlot(metric) : delPlot(metric)
              }
            />
            <label htmlFor={makeId(metric)}>{metric}</label>
          </li>
        ))}
      </ul>
    </>
  )
}
