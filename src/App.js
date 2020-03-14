import React, { Component } from "react"

import JCtrl from "./JCtrl"
import JPlot from "./JPlot"
import "./App.scss"
import { connect } from "react-redux"
import {
  delPlot,
  setDataSet,
  selectPoint,
  focusPoint,
  saveDataSet
} from "./reducers/actions"

class App extends Component {
  componentDidMount() {
    const {
      // state
      data: chartData,
      savedDataSets,
      // actions
      saveDataSet,
      setDataSet
    } = this.props

    const SAMPLE_SETS = [
      { name: "Random People 1", src: "./MOCK_DATA_1.json" },
      { name: "Random People 2", src: "./MOCK_DATA_2.json" },
      {
        name: "Chicago Gas Stations",
        src:
          "https://data.cityofchicago.org/resource/f7f2-ggz5.json?$limit=100&$offset=100"
      }
    ]
    if (savedDataSets.length === 0) {
      SAMPLE_SETS.forEach((dataSet, index) => {
        fetch(dataSet.src)
          .then(raw => raw.json())
          .then(data => {
            saveDataSet(dataSet.name, data)
            if (index === 0 && chartData.length === 0) {
              setDataSet(dataSet.name)
            }
          })
      })
    }
  }

  onPointClick(point) {
    if (point.id === this.props.selectedPoint.id) {
      this.drillIntoPoint(point)
    } else if (point.id === this.props.focusedPoint.id) {
      this.props.selectPoint(point)
    } else {
      this.props.focusPoint(point)
    }
  }

  drillIntoPoint(point) {
    console.log("todo: drill into point")
  }

  render() {
    const {
      selectedPoint,
      selectedDataSet,
      plots,
      data,
      delPlot,
      metricBounds,
      focusedPoint,
      userConfig
    } = this.props
    return (
      <div className='app-container'>
        <JCtrl />
        <div className='app-container__jp-holder'>
          <h3 className='app-container__jp-title'>{selectedDataSet}</h3>
          {plots.map((metric, idx) => (
            <JPlot
              userConfig={userConfig}
              key={idx + metric}
              selectedPoint={selectedPoint}
              onPointClick={point => this.onPointClick(point)}
              focusedPoint={focusedPoint}
              metric={metric}
              metricBounds={metricBounds[metric]}
              delPlot={() => delPlot(metric)}
              data={data}
            />
          ))}
          {!plots.length && (
            <h4 className='app-container__no-plots'>Add some plots!</h4>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  dataSet: {
    plots,
    selectedDataSet,
    metricBounds,
    data,
    savedDataSets,
    selectedPoint,
    focusedPoint
  },
  userConfig
}) => ({
  plots,
  selectedDataSet,
  metricBounds,
  data,
  savedDataSets,
  selectedPoint,
  focusedPoint,
  userConfig
})

const mapDispatchToProps = dispatch => ({
  delPlot: metric => {
    dispatch(delPlot(metric))
  },
  saveDataSet: (name, data) => {
    dispatch(saveDataSet(name, data))
  },
  setDataSet: data => {
    dispatch(setDataSet(data))
  },
  selectPoint: point => {
    dispatch(selectPoint(point))
  },
  focusPoint: point => {
    dispatch(focusPoint(point))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
