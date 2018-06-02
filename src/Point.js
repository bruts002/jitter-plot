import React, { Component } from 'react';

class Point extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
      cx: this.randX()
    };

  }

  getOpacity() {
    let opacity;
    if (this.props.isFocusedPoint || (this.state && this.state.isHover)) {
      opacity = 1;
    } else if (this.props.isSelectedPoint) {
      opacity = 0.8;
    } else {
      opacity = 0.6;
    }
    return opacity;
  }

  hoverMenu(isHover) {
    this.setState({
      isHover
    });
  }

  randX() {
    if (this.props.isSelectedPoint) {
      return 150;
    } else {
      return Math.floor(Math.random() * (300-this.props.radius/2)) + this.props.radius/2;
    }
  }

  getFill() {
    const {
      isOutOfRange,
      isSelectedPoint,
      colors: {
        selected = '#db4437',
        selectedDisabled = '#d5dc7e',
        enabled = '#4285f4',
        disabled = 'lightgray'
      } = {}
    } = this.props;

    if (isOutOfRange) {
      if (isSelectedPoint) {
        return selectedDisabled;
      } else {
        return disabled;
      }
    } else {
      if (isSelectedPoint) {
        return selected;
      } else {
        return enabled;
      }
    }
  }

  getStroke() {
    let stroke;
    if (this.props.isFocusedPoint) {
      stroke = "white";
    } else if (this.state.isHover) {
      stroke = "black";
    }
    return stroke;
  }

  getStrokeWidth() {
    if (this.props.isFocusedPoint || this.state.isHover) { return 1; }
  }

  render() {
    return (
      <circle
        cx={this.state.cx}
        cy={this.props.cy}
        r={this.props.radius}
        data={this.props.data.bmi}
        fillOpacity={this.getOpacity()}
        stroke={this.getStroke()}
        strokeWidth={this.getStrokeWidth()}
        onMouseEnter={ e => this.hoverMenu(true)}
        onMouseLeave={ e => this.hoverMenu(false)}
        onClick={ () => this.props.onPointClick() }
        fill={this.getFill()} />
    );
  }
}

export default Point;
