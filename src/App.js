import React, { Component } from 'react';
import dataSetAPI from './my-utils/dataSetAPI';
import JCtrl from './JCtrl';
import JPlot from './JPlot';
import { connect } from 'react-redux';
import {
  addPlot,
  delPlot,
  setMode,
  setData,
  deleteDataSet,
  selectPoint,
  focusPoint,
  updateMetricBounds
} from './reducers/actions';

class App extends Component {

  componentDidMount() {
    const _this = this;
    const { saveData } = dataSetAPI;
    fetch('./MOCK_DATA_2.json')
      .then( data => data.json())
      .then( resp => saveData('Random People 2', resp));
    fetch('./MOCK_DATA_1.json')
      .then( data => data.json())
      .then( resp => {
        saveData('Random People', resp);
        if (_this.props.chartData.length === 0) {
          _this.props.setData(resp);
        }
      });
  }

  onPointClick(point) {
    if (point.id === this.props.selectedPoint.id){
      this.drillIntoPoint(point);
    } else if (point.id === this.props.focusedPoint.id) {
      this.props.selectPoint(point);
    } else {
      this.props.focusPoint(point);
    }
  }

  drillIntoPoint(point) {
    console.log('todo: drill into point');
  }

  getKey(point, idx) {
    if (typeof +point.index === 'number') {
      return +point.index;
    } else if (typeof +point.id === 'number') {
      return +point.id;
    } else return idx;
  }

  render() {
    const {
      mode,
      setMode,
      selectedPoint,
      selectPoint,
      chartData,
      validMetrics,
      loading,
      addPlot,
      deleteDataSet,
      setData,
      metricBounds,
      updateMetricBounds,
      focusedPoint,
    } = this.props;
    return (
        <div className='jp-container'>
          <JCtrl
            mode={mode}
            setMode={setMode}
            selectedPoint={selectedPoint}
            selectPoint={selectPoint}
            chartData={chartData}
            validMetrics={validMetrics}
            loading={loading}
            addPlot={addPlot}
            deleteDataSet={deleteDataSet}
            setData={setData}
            metricBounds={metricBounds}
            updateMetricBounds={updateMetricBounds}
            focusedPoint={focusedPoint}
          />
          {this.props.plots.map( (metric, idx) => (
            <JPlot
              key={idx+metric}
              selectedPoint={selectedPoint}
              onPointClick={ point => this.onPointClick(point) }
              focusedPoint={this.props.focusedPoint}
              metric={metric}
              metricBounds={this.props.metricBounds[metric]}
              delPlot={ () => this.props.delPlot(metric)}
              chartData={this.props.chartData} />
            ))
          }
        </div>
    );
  }
}

const mapStateToProps = ({
  mode,
  plots,
  validMetrics,
  metricBounds,
  chartData,
  selectedPoint,
  focusedPoint,
}) => ({
  mode,
  plots,
  validMetrics,
  metricBounds,
  chartData,
  selectedPoint,
  focusedPoint,
})

const mapDispatchToProps = dispatch => ({
  addPlot: metric => { dispatch(addPlot(metric)) },
  delPlot: metric => { dispatch(delPlot(metric))},
  setMode: mode => { dispatch(setMode(mode))},
  setData: data => { dispatch(setData(data))},
  deleteDataSet: dataSet => { dispatch(deleteDataSet(dataSet))},
  selectPoint: point => { dispatch(selectPoint(point))},
  focusPoint: point => { dispatch(focusPoint(point))},
  updateMetricBounds: (metric,data) => { dispatch(updateMetricBounds(metric,data)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
