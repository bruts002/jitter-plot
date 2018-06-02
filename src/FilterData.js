import React from 'react';
import RangeInput from './inputs/RangeInput/RangeInput';

export default ({
    chartData,
    plots: metrics,
    metricBounds,
    updateMetricBounds
}) => {
    const optionsMap = {};
    chartData.forEach( datum => {
        metrics.forEach( metric => {
            if (!optionsMap[metric]) {
                optionsMap[metric] = {
                    min: datum[metric],
                    max: datum[metric]
                };
            } else if (datum[metric] < optionsMap[metric].min) {
                optionsMap[metric].min = datum[metric];
            } else if (datum[metric] > optionsMap[metric].max) {
                optionsMap[metric].max = datum[metric];
            }
        });
    });
    return <div>
        <h2>Filter Data</h2>
        {metrics.map( metric => <div key={metric}>
            <label>{`${metric} : ${optionsMap[metric].min} - ${optionsMap[metric].max}`}</label><br/>
            <RangeInput
                min={optionsMap[metric].min}
                max={optionsMap[metric].max}
                lowerBound={metricBounds[metric].lowerBound}
                upperBound={metricBounds[metric].upperBound}
                onChange={ newBounds => updateMetricBounds(metric, newBounds)}
            />
        </div>)}
    </div>
};
