import React, { Component } from 'react';

import JCtrl from './JCtrl';
import JPlot from './JPlot';
import { connect } from 'react-redux';
import {
  delPlot,
  setDataSet,
  selectPoint,
  focusPoint,
  saveDataSet,
} from './reducers/actions';

class App extends Component {

  componentDidMount() {
    const {
      // state
      data: chartData,
      savedDataSets,
      // actions
      saveDataSet,
      setDataSet,
    } = this.props;

    const SAMPLE_SETS = [
      './MOCK_DATA_1.json',
      './MOCK_DATA_2.json'
    ];
    if (savedDataSets.length === 0) {
      SAMPLE_SETS.forEach( (url, index) => {
        fetch(url)
          .then( raw => raw.json())
          .then( data => {
            const dataSetName = `Random People ${index+1}`;
            saveDataSet(dataSetName, data)
            if (index === 0 && chartData.length === 0) {
              setDataSet(dataSetName);
            }
          });
      });
    }
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
    savedDataSets,
    selectedPoint,
    focusedPoint,
  }
}) => ({
  plots,
  metricBounds,
  data,
  savedDataSets,
  selectedPoint,
  focusedPoint,
})

const mapDispatchToProps = dispatch => ({
  delPlot: metric => { dispatch(delPlot(metric))},
  saveDataSet: (name, data) => {dispatch(saveDataSet(name, data))},
  setDataSet: data => { dispatch(setDataSet(data))},
  selectPoint: point => { dispatch(selectPoint(point))},
  focusPoint: point => { dispatch(focusPoint(point))},
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
