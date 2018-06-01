import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from './my-utils/Axis';
import Point from './Point';
import {
  max as d3Max,
  min as d3Min,
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
  axisRight as d3AxisRight,
} from 'd3';

const config = {
  radius: 10,
  margin: {
    top: 10,
    side: 10
  },
  svgStyle: { padding: '10px' },
  primaryColor: '#ffee10',
  height: 450,
  width: 300,
};

class JitterPlot extends Component {

  constructor(props) {
    super(props);

    // set state
    const {
      metric,
      chartData
    } = this.props;
    const max = d3Max(chartData, d => Math.round(d[metric]));
    const min = d3Min(chartData, d => Math.round(d[metric]));
    let yScale = d3ScaleLinear()
      .domain([ min, max ])
      .range([ config.height - config.margin.top, 0 ]);

    if (metric.includes('date') || metric.includes('day')) {
      yScale = d3ScaleTime()
        .range([ config.height - config.margin.top, min ]);
    }

    this.state = {
      yScale,
      max,
      min
    };
  }

  getY(val) {
    return this.state.yScale(val);
  }

  isSelectedPoint({id}) {
    return this.props.selectedPoint.id === id;
  }

  renderFooter() {
    const {
      selectedPoint: { id: selectedPointId },
      chartData,
      metric
    } = this.props;

    let spIdx = -1;
    chartData.sort( (a, b) => {
      return Math.round(a[metric]) - Math.round(b[metric]);
    }).some( ({ id: currentId }, idx) => {
      if (currentId === selectedPointId) {
        spIdx = idx + 1;
      }
      return spIdx !== -1;
    });
    const position = `${spIdx} of ${chartData.length}`;
    const percentile = 'Percentile: ' + Math.round(spIdx / chartData.length * 100) + '%';

    return (
      chartData.length ?
        <div className='j-plot__text'>
          <h3>{position}</h3>
          <h4>{percentile}</h4>
        </div> :
        <div className='j-plot__text'>
          <h3>&nbsp;</h3>
        </div>
    );
  }

  renderHeader() {
    const {
      metric,
      chartData,
      delPlot
    } = this.props;
    return (
      <div className='j-plot__text'>
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

  renderBody() {
    const {
      metric,
      chartData,
      metricBounds,
      focusedPoint,
      onPointClick,
    } = this.props;
    const {
      max,
      min,
      yScale
    } = this.state;

    const tickValues = [ min ];
    if (metricBounds.lowerBound !== min) {
      tickValues.push(metricBounds.lowerBound);
    }
    if (metricBounds.upperBound !== max &&
      metricBounds.upperBound !== metricBounds.lowerBound
    ) {
      tickValues.push(metricBounds.upperBound);
    }
    if (metricBounds.lowerBound !== max) {
      tickValues.push(max)
    }

    const yAxis = d3AxisRight(yScale)
      .tickValues(tickValues);

    return chartData.length ?
      <svg
        width={config.width}
        height={config.height}
        style={config.svgStyle}>
        <g>
          <Axis
            height={config.height-config.margin.top}
            axis={yAxis} />
          {chartData.map( person => <Point
            primaryColor={config.primaryColor}
            key={person.id}
            cy={this.getY(Math.round(person[metric]))}
            radius={config.radius}
            isFocusedPoint={focusedPoint === person}
            isSelectedPoint={this.isSelectedPoint(person)}
            onPointClick={ () => onPointClick(person) }
            data={person} />)
          }
        </g>
      </svg> :
      <div style={{
        width: config.width,
        height: config.height
      }}/>
  }

  render() {
    return (
      <div className='j-plot'>
        {this.renderHeader()}
        <hr/>
        {this.renderBody()}
        <hr />
        {this.renderFooter()}
      </div>
    );
  }
}

JitterPlot.propTypes = {
  chartData: PropTypes.array,
  metric: PropTypes.string,
  selectedPoint: PropTypes.shape({
    id: PropTypes.number
  }),
  metricBounds: PropTypes.shape({
    upperBound: PropTypes.number,
    lowerBound: PropTypes.number
  })
}

JitterPlot.defaultProps = {
  chartData: [],
  metric: '',
  selectedPoint: {},
  metricBounds: {}
};

export default JitterPlot;
