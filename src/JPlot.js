import React, { Component } from 'react';
import Axis from './my-utils/Axis';
import Point from './Point';
import * as d3 from 'd3';

class JitterPlot extends Component {

  constructor(props) {
    super(props);

    // set state
    var { field } = this.props.jp,
        max = d3.max(this.props.chartData, d => d[field]),
        min = d3.min(this.props.chartData, d => d[field]),
        radius = 10,
        margin = {
          top: 10,
          side: 10
        },
        svgStyle = { padding: '10px' },
        yScale = d3.scaleLinear()
          .domain([ min, max ])
          .range([ this.props.height - margin.top, min ]),
        yAxis = d3.axisRight(yScale)
          .tickValues([ min, max ]),
        xScale = d3.scaleLinear()
          .domain([ 0, this.props.width ])
          .range([ 0, this.props.width - margin.side ]),
        xAxis = d3.axisTop(xScale)
          .tickValues([ this.props.width ]),
        jpStyle = {
          float: 'right',
          border: '1px solid gray'
        },
        jpHeader = {
          padding: '10px',
          textAlign: 'center'
        };

    if (field.includes('date') || field.includes('day')) {
      yScale = d3.scaleTime()
        .range([ this.props.height - margin.top, min ]);
    }

    this.state = {
        margin: margin,
        svgStyle: svgStyle,
        max: max,
        min: min,
        yScale: yScale,
        yAxis: yAxis,
        xScale: xScale,
        xAxis: xAxis,
        jpStyle: jpStyle,
        jpHeader: jpHeader,
        radius: radius
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
      jp: { field },
    } = this.props;

    let spIdx = -1;
    chartData.sort( (a, b) => {
      return a[field] - b[field];
    }).some( (curr, idx) => {
      if (curr.id === selectedPoint.id) {
        spIdx = idx + 1;
      }
      return spIdx !== -1;
    });
    const position = `${spIdx} of ${chartData.length}`;
    const percentile = 'Percentile: ' + Math.round(spIdx / chartData.length * 100) + '%';

    return (
      <div style={this.state.jpHeader}>
        <h3>{position}</h3>
        <h4>{percentile}</h4>
      </div>
    );
  }

  getHeader() {
    const { field } = this.props.jp;
    return (
      <div style={this.state.jpHeader}>
        <span className="deleteIcon">
          <i onClick={ () => this.props.delPlot()}
              className="fa fa-times-circle"
              aria-hidden="true"></i>
        </span>
        <h2>{field}</h2>
      </div>
    );
  }

  render() {
    const { field } = this.props.jp;
    return (
      <div className='j-plot' style={this.state.jpStyle}>
        {this.getHeader()}
        <hr/>
        <svg
          width={this.props.width}
          height={this.props.height}
          style={this.state.svgStyle}>
          <g>
            <Axis
              height={this.props.height-this.state.margin.top}
              axis={this.state.yAxis}
              axisType='y' />
          {
            this.props.chartData.map( person => (
              <Point
                primaryColor={this.props.primaryColor}
                key={person.id}
                cy={this.getY(person[field])}
                height={this.state.max}
                radius={this.state.radius}
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
