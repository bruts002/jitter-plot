import React from 'react';

export default ({
    chartData,
    validMetrics,
    metricBounds,
    updateMetricBounds
}) => {
    const optionsMap = {};
    chartData.forEach( datum => {
        validMetrics.forEach( metric => {
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
        {validMetrics.map( metric => <div key={metric}>
            <label>{`${metric} : ${optionsMap[metric].min} - ${optionsMap[metric].max}`}</label><br/>
            {/* <input type="range" max={optionsMap[metric].max} min={optionsMap[metric].min}/> */}
            <input
                type='number'
                onChange={ e => updateMetricBounds(metric, {
                    lowerBound: +e.target.value,
                    upperBound: metricBounds[metric].upperBound
                })}
                value={metricBounds[metric].lowerBound}
                max={Math.min(optionsMap[metric].max, metricBounds[metric].upperBound)}
                min={optionsMap[metric].min}/>
            <input
                type='number'
                onChange={ e => updateMetricBounds(metric, {
                    upperBound: +e.target.value,
                    lowerBound: metricBounds[metric].lowerBound
                })}
                value={metricBounds[metric].upperBound}
                max={optionsMap[metric].max}
                min={Math.max(optionsMap[metric].min, metricBounds[metric].lowerBound)}/>
        </div>)}
    </div>
};
