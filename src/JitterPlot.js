import React, { Component } from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryContainer } from 'victory';

class JitterPlot extends Component {

  render() {
    var chartData = require('./people.json'),
        width = 1920,
        height = 1080,
        containerStyle = {
          width: 300,
          height: 1000,
          border: '2px solid black'
        };
    chartData.forEach( d => d.randX = Math.random() * 5 + 1);
    return (
      <div style={containerStyle}>
        <VictoryContainer
          responsive={false}
          width={width}
          height={height}
        >
          <VictoryChart
              theme={VictoryTheme.material}
          >
            <VictoryScatter
              data={chartData}
              x='randX'
              y='age'
            />
          </VictoryChart>
        </VictoryContainer>
      </div>
    );
  }
}

export default JitterPlot;
