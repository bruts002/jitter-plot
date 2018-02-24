import React, { Component } from 'react';
import Loading from './my-utils/Loading';
import JPlot from './JPlot';
import PointViewer from './PointViewer';
import DataUploader from './DataUploader';
import SavedData from './SavedData';
import PlotAdder from './PlotAdder';
import ActionSelector from './ActionSelector';
import { connect } from 'react-redux';
import {
  addPlot,
  delPlot,
  setMode,
  setData,
  selectPoint,
  focusPoint
} from './reducers/actions';

const primaryColor = '#ffee10';

class JPlotController extends Component {

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
      case 'addPlot':
        return <PlotAdder
          validMetrics={ this.props.validMetrics }
          addPlot={ metric => this.props.addPlot(metric) } />
      case 'viewSaved':
        return <SavedData setChartData={ newData => this.props.setData(newData)} />
      case 'upload':
        return <DataUploader setChartData={ newData => this.props.setData(newData)} />
      case 'viewDetails':
        return <PointViewer
          primaryColor={primaryColor}
          focusedPoint={this.props.focusedPoint}
          selectedPoint={this.props.selectedPoint} />
      default:
        return <div>Unknown mode</div>
    }
  }

  render() {
    return (
        <div>
          <div className='jp-ctrl'>
            <div>
              <label htmlFor='agent'>Agent</label>
              <select
                name="agent"
                value={this.props.selectedPoint}
                onChange={ e => this.props.selectPoint(this.props.chartData[e.target.value])}>
              {
                this.props.chartData.map( (point,idx) => (
                  <option
                    key={point.name || point.first_name}
                    value={idx}>
                    {point.name || point.first_name}
                  </option>
                ))
              }
              </select>
            </div>
            <hr />
            { this.renderAction() }
            <ActionSelector
              primaryColor={primaryColor}
              action={this.props.mode}
              setAction={ action => this.props.setMode(action)} />
          </div>
          <div className='jp-holder'>
          {
            this.props.plots.map( (jp, idx) => (
              <JPlot
                  primaryColor={primaryColor}
                  key={idx}
                  nameId={idx}
                  selectedPoint={this.props.selectedPoint}
                  onPointClick={ point => this.onPointClick(point) }
                  focusedPoint={this.props.focusedPoint}
                  jp={jp}
                  delPlot={ () => this.props.delPlot(jp.field)}
                  height={450}
                  width={300}
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
  selectPoint: point => { dispatch(selectPoint(point))},
  focusPoint: point => { dispatch(focusPoint(point))},
})

export default connect(mapStateToProps, mapDispatchToProps)(JPlotController);
