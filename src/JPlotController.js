import React, { Component } from 'react';
import Loading from './my-utils/Loading';
import dataSetAPI from './my-utils/dataSetAPI';
import JPlot from './JPlot';
import PointViewer from './PointViewer';
import SavedData from './SavedData';
import FilterData from './FilterData';
import PlotAdder from './PlotAdder';
import ActionSelector from './ActionSelector';
import { connect } from 'react-redux';
import {
  addPlot,
  delPlot,
  setMode,
  setData,
  deleteDataSet,
  selectPoint,
  focusPoint
} from './reducers/actions';

class JPlotController extends Component {

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

  renderAction(){
    if (this.props.loading) {
      return <Loading />
    }
    switch (this.props.mode) {
      case ActionSelector.ADD_PLOT:
        return <PlotAdder
          validMetrics={ this.props.validMetrics }
          addPlot={ metric => this.props.addPlot(metric) } />
      case ActionSelector.VIEW_SAVED:
        return <SavedData
          deleteDataSet={ dataSet => this.props.deleteDataSet(dataSet) }
          setChartData={ newData => this.props.setData(newData)} />
      case ActionSelector.FILTER_DATA:
        return <FilterData />
      case ActionSelector.VIEW_DETAILS:
        return <PointViewer
          focusedPoint={this.props.focusedPoint}
          selectedPoint={this.props.selectedPoint} />
      default:
        return <div>Unknown mode</div>
    }
  }

  selectFromDropDown(id) {
    let point;
    this.props.chartData.some( data => {
      if (data.id === id) {
        point = data;
      }
      return point
    })
    this.props.selectPoint(point);
  }

  render() {
    return (
        <div>
          <div className='jp-ctrl'>
            <div>
              <label htmlFor='agent'>Agent</label>
              <select
                name="agent"
                value={this.props.selectedPoint.id}
                onChange={ e => this.selectFromDropDown(+e.target.value)}>
              {
                this.props.chartData.map( (point,idx) => (
                  <option
                    key={point.id}
                    value={point.id}>
                    {point.name || point.first_name || point[this.props.validMetrics[0]]}
                  </option>
                ))
              }
              </select>
            </div>
            <hr />
            { this.renderAction() }
            <ActionSelector
              action={this.props.mode}
              setAction={ action => this.props.setMode(action)} />
          </div>
          <div className='jp-holder'>
          {
            this.props.plots.map( (metric, idx) => (
              <JPlot
                key={idx+metric}
                selectedPoint={this.props.selectedPoint}
                onPointClick={ point => this.onPointClick(point) }
                focusedPoint={this.props.focusedPoint}
                metric={metric}
                delPlot={ () => this.props.delPlot(metric)}
                chartData={this.props.chartData} />
            ))
          }
          </div>
        </div>
    );
  }
}

const mapStateToProps = ({
  mode,
  plots,
  validMetrics,
  chartData,
  selectedPoint,
  focusedPoint,
}) => ({
  mode,
  plots,
  validMetrics,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(JPlotController);
