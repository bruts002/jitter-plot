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
      .call(this.props.axis);
  }
  render() {
    return (
      <g
        className='axis gray-stroke'
        stroke='grey'
        transform={'translate(0, 0)'}>
      </g>
    );
  }
}

export default Axis;
