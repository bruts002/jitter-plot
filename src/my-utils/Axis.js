import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { select  as d3Select } from 'd3';

class Axis extends Component {
  componentDidUpdate() {
    this.renderAxis();
  }
  componentDidMount() {
    this.renderAxis();
  }
  renderAxis() {
    var node = ReactDOM.findDOMNode(this);
    d3Select(node)
      .attr('class', 'gray-stroke')
      .call(this.props.axis);
  }
  render() {
    var translate;
    if (this.props.axisType === 'x') {
      translate = `translate(0,${this.props.height})`;
    } else if (this.props.axisType === 'y') {
      translate = `translate(0, 0)`;
    }
    return (
      <g
        className='axis'
        stroke='grey'
        transform={translate}>
      </g>
    );
  }
}

export default Axis;
