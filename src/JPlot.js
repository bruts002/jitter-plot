import React, { Component } from 'react';
import Axis from './my-utils/Axis';
import Point from './Point';
import * as d3 from 'd3';

const config = {
  radius: 10,
  margin: {
    top: 10,
    side: 10
  },
  svgStyle: { padding: '10px' },
  jpStyle: {
    float: 'right',
    border: '1px solid gray'
  },
  jpHeader: {
    padding: '10px',
    textAlign: 'center'
  },
  primaryColor: '#ffee10',
  height: 450,
  width: 300,
};

class JitterPlot extends Component {

  constructor(props) {
    super(props);

    // set state
    const { metric } = this.props;
    const max = d3.max(this.props.chartData, d => Math.round(d[metric]));
    const min = d3.min(this.props.chartData, d => Math.round(d[metric]));
    let yScale = d3
      .scaleLinear()
      .domain([ min, max ])
      .range([ config.height - config.margin.top, 0 ]);
    const yAxis = d3
      .axisRight(yScale)
      .tickValues([ min, max ]);

    if (metric.includes('date') || metric.includes('day')) {
      yScale = d3.scaleTime()
        .range([ config.height - config.margin.top, min ]);
    }

    this.state = {
      yScale,
      yAxis,
    };
  }

  getY(val) {
    return this.state.yScale(val);
  }

  isSelectedPoint(point) {
    return this.props.selectedPoint.id === point.id;
  }

  getFooter() {
    const {
      selectedPoint,
      chartData,
      metric
    } = this.props;

    let spIdx = -1;
    chartData.sort( (a, b) => {
      return Math.round(a[metric]) - Math.round(b[metric]);
    }).some( (curr, idx) => {
      if (curr.id === selectedPoint.id) {
        spIdx = idx + 1;
      }
      return spIdx !== -1;
    });
    const position = `${spIdx} of ${chartData.length}`;
    const percentile = 'Percentile: ' + Math.round(spIdx / chartData.length * 100) + '%';

    return (
      chartData.length ?
        <div style={config.jpHeader}>
          <h3>{position}</h3>
          <h4>{percentile}</h4>
        </div> :
        <div style={config.jpHeader}>
          <h3>&nbsp;</h3>
        </div>
    );
  }

  getHeader() {
    const {
      metric,
      chartData,
      delPlot
    } = this.props;
    return (
      <div style={config.jpHeader}>
        <span
          className="deleteIcon"
          onClick={ delPlot }>
          <i
            className="fa fa-times-circle"
            aria-hidden="true"></i>
        </span>
        <h2>{chartData.length ? metric : 'No Data'}</h2>
      </div>
    );
  }

  render() {
    const {
      metric,
      chartData
     } = this.props;
    return (
      <div className='j-plot' style={config.jpStyle}>
        {this.getHeader()}
        <hr/>
        {chartData.length ?
          <svg
            width={config.width}
            height={config.height}
            style={config.svgStyle}>
            <g>
              <Axis
                height={config.height-config.margin.top}
                axis={this.state.yAxis} />
            {
              this.props.chartData.map( person => (
                <Point
                  primaryColor={config.primaryColor}
                  key={person.id}
                  cy={this.getY(Math.round(person[metric]))}
                  radius={config.radius}
                  isFocusedPoint={this.props.focusedPoint === person}
                  isSelectedPoint={this.isSelectedPoint(person)}
                  onPointClick={ () => this.props.onPointClick(person) }
                  data={person} />
              ))
            }
            </g>
          </svg> :
          <div
            style={{
              width: config.width,
              height: config.height
            }}
          />}
        <hr />
        {this.getFooter()}
      </div>
    );
  }
}

JitterPlot.defaultProps = {
  chartData: [],
  metric: '',
  selectedPoint: {}
};

export default JitterPlot;
