import React, { Component } from 'react';
import dataSetAPI from './my-utils/dataSetAPI';
import JCtrl from './JCtrl';
import JPlot from './JPlot';
import { connect } from 'react-redux';
import {
  delPlot,
  setDataSet,
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
        if (_this.props.data.length === 0) {
          _this.props.setDataSet(resp);
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
      data,
      delPlot,
      metricBounds,
      focusedPoint,
    } = this.props;
    return (
        <div className='jp-container'>
          <JCtrl />
          <div className='jp-ctrl__outer-container'>
            <div className='jp__header'>
              <h3>Title</h3>
            </div>
            <div className='jp-container'>
              {plots.map( (metric, idx) => (
                <JPlot
                  key={idx+metric}
                  selectedPoint={selectedPoint}
                  onPointClick={ point => this.onPointClick(point) }
                  focusedPoint={focusedPoint}
                  metric={metric}
                  metricBounds={metricBounds[metric]}
                  delPlot={ () => delPlot(metric)}
                  data={data} />
                ))
              }
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({
  dataSet: {
    plots,
    metricBounds,
    data,
    selectedPoint,
    focusedPoint,
  }
}) => ({
  plots,
  metricBounds,
  data,
  selectedPoint,
  focusedPoint,
})

const mapDispatchToProps = dispatch => ({
  delPlot: metric => { dispatch(delPlot(metric))},
  setDataSet: data => { dispatch(setDataSet(data))},
  selectPoint: point => { dispatch(selectPoint(point))},
  focusPoint: point => { dispatch(focusPoint(point))},
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
