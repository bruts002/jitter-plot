import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from './my-utils/Axis';
import IconButton from './inputs/IconButton/IconButton';
import Point from './Point';
import {
  max as d3Max,
  min as d3Min,
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
  axisRight as d3AxisRight,
} from 'd3';
import './j-plot.scss';

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
      data
    } = this.props;
    const max = d3Max(data, d => Math.round(d[metric]));
    const min = d3Min(data, d => Math.round(d[metric]));
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
      data,
      metric
    } = this.props;

    let spIdx = -1;
    data.sort( (a, b) => {
      return Math.round(a[metric]) - Math.round(b[metric]);
    }).some( ({ id: currentId }, idx) => {
      if (currentId === selectedPointId) {
        spIdx = idx + 1;
      }
      return spIdx !== -1;
    });
    const position = `${spIdx} of ${data.length}`;
    const percentile = 'Percentile: ' + Math.round(spIdx / data.length * 100) + '%';

    return (
      data.length ?
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
      data,
      delPlot
    } = this.props;
    return (
      <div className='j-plot__text'>
        <span onClick={ delPlot }>
          <IconButton size='24' icon='times-circle' />
        </span>
        <h2>{data.length ? metric : 'No Data'}</h2>
      </div>
    );
  }

  renderBody() {
    const {
      metric,
      data,
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

    return data.length ?
      <svg
        width={config.width}
        height={config.height}
        style={config.svgStyle}>
        <g>
          <Axis
            height={config.height-config.margin.top}
            axis={yAxis} />
          {data.map( person => <Point
            colors={{
              selected: config.primaryColor
            }}
            key={person.id}
            cy={this.getY(Math.round(person[metric]))}
            radius={config.radius}
            isFocusedPoint={focusedPoint === person}
            isSelectedPoint={this.isSelectedPoint(person)}
            isOutOfRange={metricBounds.lowerBound > person[metric] || metricBounds.upperBound < person[metric]}
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
  data: PropTypes.array,
  metric: PropTypes.string,
  selectedPoint: PropTypes.shape({
    id: PropTypes.oneOfType([ 
      PropTypes.string,
      PropTypes.number
    ])
  }),
  metricBounds: PropTypes.shape({
    upperBound: PropTypes.number,
    lowerBound: PropTypes.number
  })
}

JitterPlot.defaultProps = {
  data: [],
  metric: '',
  selectedPoint: {},
  metricBounds: {}
};

export default JitterPlot;
