import React, { Component } from 'react';
import JPlot from './JPlot';
import PointViewer from './PointViewer';
import DataUploader from './DataUploader';
import SavedData from './SavedData';
import PlotAdder from './PlotAdder';
import ActionSelector from './ActionSelector';

const chartData = require('./people.json');
const primaryColor = '#ffee10';

class JPlotController extends Component {

  constructor(props) {
    super(props);

    this.state = {
      action: 'addPlot',
      jps: [{
        name: 'BMI',
        field: 'bmi'
      }],
      chartData: chartData,
      selectedPoint: chartData[0],
      focusedPoint: undefined
    };
  }

  setAction(action) {
    this.setState({
      action
    });
  }

  addJPlot(newPlot) {
    var newJPS = this.state.jps.slice();
    newJPS.push(newPlot);
    this.setState({ jps: newJPS });
  }

  setChartData(newData) {
    this.setState({
      jps: [],
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

  destroyJPlot(idx) {
    this.setState( prevState => {
      var jps = prevState.jps;
      jps.splice(idx,1);
      return { jps: jps };
    });
  }

  getKey(point, idx) {
    if (typeof +point.index === 'number') {
      return +point.index;
    } else if (typeof +point.id === 'number') {
      return +point.id;
    } else return idx;
  }

  getReportableKeys(row) {
    return Object.keys(row).filter( key => {
      return typeof row[key] === 'number';
    });
  }

  renderAction(){
    switch (this.state.action) {
      case 'addPlot':
        return <PlotAdder
          chartKeys={ this.getReportableKeys(this.state.chartData[0]) }
          addJPlot={ newPlot => this.addJPlot(newPlot)} />
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
        return <div>Unknown action</div>
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
              action={this.state.action}
              setAction={ action => this.setAction(action)} />
          </div>
          <div className='jp-holder'>
          {
            this.state.jps.map( (jp, idx) => (
              <JPlot
                  primaryColor={primaryColor}
                  key={idx}
                  nameId={idx}
                  selectedPoint={this.state.selectedPoint}
                  setSelectedPoint={ point => this.setSelectedPoint(point) }
                  focusedPoint={this.state.focusedPoint}
                  setFocusedPoint={ point => this.setFocusedPoint(point)}
                  jp={jp}
                  destroyJPlot={ idx => this.destroyJPlot(idx)}
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

export default JPlotController;
