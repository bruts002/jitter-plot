import React, { Component } from 'react';
import dataSetAPI from './my-utils/dataSetAPI';
import JCtrl from './JCtrl';
import JPlot from './JPlot';
import { connect } from 'react-redux';
import {
  delPlot,
  setData,
  selectPoint,
  focusPoint,
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

  render() {
    const {
      selectedPoint,
      plots,
      chartData,
      delPlot,
      metricBounds,
      focusedPoint,
    } = this.props;
    return (
        <div className='jp-container'>
          <JCtrl />
          {plots.map( (metric, idx) => (
            <JPlot
              key={idx+metric}
              selectedPoint={selectedPoint}
              onPointClick={ point => this.onPointClick(point) }
              focusedPoint={focusedPoint}
              metric={metric}
              metricBounds={metricBounds[metric]}
              delPlot={ () => delPlot(metric)}
              chartData={chartData} />
            ))
          }
        </div>
    );
  }
}

const mapStateToProps = ({
  plots,
  metricBounds,
  chartData,
  selectedPoint,
  focusedPoint,
}) => ({
  plots,
  metricBounds,
  chartData,
  selectedPoint,
  focusedPoint,
})

const mapDispatchToProps = dispatch => ({
  delPlot: metric => { dispatch(delPlot(metric))},
  setData: data => { dispatch(setData(data))},
  selectPoint: point => { dispatch(selectPoint(point))},
  focusPoint: point => { dispatch(focusPoint(point))},
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
