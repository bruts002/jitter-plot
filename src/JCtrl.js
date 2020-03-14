import React from "react"

import Loading from "./my-utils/Loading"
import PointViewer from "./PointViewer"
import SavedData from "./SavedData"
import FilterData from "./FilterData"
import PlotAdder from "./PlotAdder"
import ActionSelector, { USER_ACTIONS } from "./ActionSelector"
import "./j-ctrl.scss"

import { connect } from "react-redux"
import {
  addPlot,
  delPlot,
  saveDataSet,
  setDataSet,
  deleteDataSet,
  selectPoint,
  focusPoint,
  updateMetricBounds
} from "./reducers/actions"

function JCtrl(props) {
  const [mode, setMode] = React.useState(USER_ACTIONS.ADD_PLOT)
  return (
    <div className='jp-ctrl'>
      <Header {...props} />
      <hr />
      <Action {...props} mode={mode} />
      <ActionSelector action={mode} setAction={setMode} />
    </div>
  )
}

function Header({ selectedPoint, selectPoint, data, validMetrics }) {
  return (
    <div className='jp-ctrl__header'>
      <label htmlFor='agent'>Agent</label>
      <select
        name='agent'
        value={selectedPoint && selectedPoint.id}
        onChange={getAgentOnChange(data, selectPoint)}
      >
        {data.map(point => (
          <option key={point.id} value={point.id}>
            {point.name || point.first_name || point[validMetrics[0]]}
          </option>
        ))}
      </select>
    </div>
  )
}

const getAgentOnChange = (data, selectPoint) => event => {
  const id = +event.target.value
  let point
  data.some(data => {
    if (data.id === id) {
      point = data
    }
    return point
  })
  selectPoint(point)
}

function Action({
  loading,
  mode,
  validMetrics,
  addPlot,
  delPlot,
  deleteDataSet,
  saveDataSet,
  setDataSet,
  data,
  savedDataSets,
  metricBounds,
  updateMetricBounds,
  focusedPoint,
  selectedPoint,
  plots
}) {
  if (loading) {
    return <Loading />
  }

  switch (mode) {
    case USER_ACTIONS.ADD_PLOT:
      return (
        <PlotAdder
          metrics={validMetrics}
          selectedMetrics={plots}
          addPlot={addPlot}
          delPlot={delPlot}
        />
      )
    case USER_ACTIONS.VIEW_SAVED:
      return (
        <SavedData
          savedDataSets={savedDataSets}
          saveDataSet={saveDataSet}
          deleteDataSet={deleteDataSet}
          setChartData={setDataSet}
        />
      )
    case USER_ACTIONS.FILTER_DATA:
      return (
        <FilterData
          data={data}
          plots={plots}
          metricBounds={metricBounds}
          updateMetricBounds={updateMetricBounds}
        />
      )
    case USER_ACTIONS.VIEW_DETAILS:
      return (
        <PointViewer
          focusedPoint={focusedPoint}
          selectedPoint={selectedPoint}
        />
      )
    default:
      return <div>Unknown mode</div>
  }
}

const mapStateToProps = ({
  dataSet: {
    plots,
    validMetrics,
    data,
    selectedPoint,
    focusedPoint,
    metricBounds,
    savedDataSets
  },
  loading,
  userConfig
}) => ({
  plots,
  validMetrics,
  metricBounds,
  savedDataSets,
  data,
  selectedPoint,
  focusedPoint,
  loading,
  userConfig
})

const mapDispatchToProps = dispatch => ({
  addPlot: metric => {
    dispatch(addPlot(metric))
  },
  delPlot: metric => {
    dispatch(delPlot(metric))
  },
  saveDataSet: (name, data) => {
    dispatch(saveDataSet(name, data))
  },
  setDataSet: data => {
    dispatch(setDataSet(data))
  },
  deleteDataSet: dataSet => {
    dispatch(deleteDataSet(dataSet))
  },
  selectPoint: point => {
    dispatch(selectPoint(point))
  },
  focusPoint: point => {
    dispatch(focusPoint(point))
  },
  updateMetricBounds: (metric, data) => {
    dispatch(updateMetricBounds(metric, data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(JCtrl)
