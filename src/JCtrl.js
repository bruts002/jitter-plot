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
  setMode,
  saveDataSet,
  setDataSet,
  deleteDataSet,
  selectPoint,
  focusPoint,
  updateMetricBounds
} from "./reducers/actions"

const JCtrl = props => (
  <div className='jp-ctrl'>
    <Header {...props} />
    <hr />
    <Action {...props} />
    <ActionSelector action={props.mode} setAction={props.setMode} />
  </div>
)

function Header({ selectedPoint, selectPoint, data, validMetrics }) {
  return (
    <div className='jp-ctrl__header'>
      <label htmlFor='agent'>Agent</label>
      <select
        name='agent'
        value={selectedPoint.id}
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
  mode,
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
  mode,
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
  setMode: mode => {
    dispatch(setMode(mode))
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
