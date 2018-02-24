import React, { Component } from 'react';
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
  setMode
} from './reducers/actions';

const chartData = require('./people.json');
const primaryColor = '#ffee10';

class JPlotController extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chartData: chartData,
      selectedPoint: chartData[0],
      focusedPoint: undefined
    };
  }

  setChartData(newData) {
    this.setState({
      chartData: newData,
      selectedPoint: chartData[0],
      focusedPoint: undefined
    });
  }

  setSelectedPoint(point) {
    if (point === this.state.selectedPoint){
      this.drillIntoPoint(point);
    } else {
      this.setState({
        selectedPoint: point
      });
    }
  }

  drillIntoPoint(point) {
    console.log('todo: drill into point');
  }

  setFocusedPoint(point) {
    this.setState({
      focusedPoint: point
    });
  }

  getKey(point, idx) {
    if (typeof +point.index === 'number') {
      return +point.index;
    } else if (typeof +point.id === 'number') {
      return +point.id;
    } else return idx;
  }

  renderAction(){
    switch (this.props.mode) {
      case 'addPlot':
        return <PlotAdder
          validMetrics={ this.props.validMetrics }
          addPlot={ metric => this.props.addPlot(metric) } />
      case 'viewSaved':
        return <SavedData setChartData={ newData => this.setChartData(newData)} />
      case 'upload':
        return <DataUploader setChartData={ newData => this.setChartData(newData)} />
      case 'viewDetails':
        return <PointViewer
          primaryColor={primaryColor}
          focusedPoint={this.state.focusedPoint}
          selectedPoint={this.state.selectedPoint} />
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
                value={this.state.selectedPoint}
                onChange={ e => this.setSelectedPoint(this.state.chartData[e.target.value])}>
              {
                this.state.chartData.map( (point,idx) => (
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
                  selectedPoint={this.state.selectedPoint}
                  setSelectedPoint={ point => this.setSelectedPoint(point) }
                  focusedPoint={this.state.focusedPoint}
                  setFocusedPoint={ point => this.setFocusedPoint(point)}
                  jp={jp}
                  delPlot={ () => this.props.delPlot(jp.field)}
                  height={450}
                  width={300}
                  chartData={this.state.chartData} />
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
  validMetrics
}) => ({
  mode,
  plots,
  validMetrics
})

const mapDispatchToProps = dispatch => ({
    addPlot: metric => { dispatch(addPlot(metric)) },
    delPlot: metric => { dispatch(delPlot(metric))},
    setMode: mode => { dispatch(setMode(mode))}
})

export default connect(mapStateToProps, mapDispatchToProps)(JPlotController);
