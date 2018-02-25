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
  }
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
      .range([ this.props.height - config.margin.top, min ]);
    const yAxis = d3
      .axisRight(yScale)
      .tickValues([ min, max ]);
    const xScale = d3
      .scaleLinear()
      .domain([ 0, this.props.width ])
      .range([ 0, this.props.width - config.margin.side ]);
    const xAxis = d3
      .axisTop(xScale)
      .tickValues([ this.props.width ]);

    if (metric.includes('date') || metric.includes('day')) {
      yScale = d3.scaleTime()
        .range([ this.props.height - config.margin.top, min ]);
    }

    this.state = {
        max: max,
        min: min,
        yScale: yScale,
        yAxis: yAxis,
        xScale: xScale,
        xAxis: xAxis,
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
      <div style={config.jpHeader}>
        <h3>{position}</h3>
        <h4>{percentile}</h4>
      </div>
    );
  }

  getHeader() {
    const {
      metric,
      delPlot
    } = this.props;
    return (
      <div style={config.jpHeader}>
        <span className="deleteIcon">
          <i onClick={ () => delPlot()}
              className="fa fa-times-circle"
              aria-hidden="true"></i>
        </span>
        <h2>{metric}</h2>
      </div>
    );
  }

  render() {
    const { metric } = this.props;
    return (
      <div className='j-plot' style={config.jpStyle}>
        {this.getHeader()}
        <hr/>
        <svg
          width={this.props.width}
          height={this.props.height}
          style={config.svgStyle}>
          <g>
            <Axis
              height={this.props.height-config.margin.top}
              axis={this.state.yAxis}
              axisType='y' />
          {
            this.props.chartData.map( person => (
              <Point
                primaryColor={this.props.primaryColor}
                key={person.id}
                cy={this.getY(Math.round(person[metric]))}
                height={this.state.max}
                radius={config.radius}
                isFocusedPoint={this.props.focusedPoint === person}
                isSelectedPoint={this.isSelectedPoint(person)}
                onPointClick={ () => this.props.onPointClick(person) }
                data={person} />
            ))
          }
          </g>
        </svg>
        <hr />
        {this.getFooter()}
      </div>
    );
  }
}

export default JitterPlot;
