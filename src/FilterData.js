import React, { Component } from 'react';

export default ({
    chartData,
    validMetrics,
}) => {
    const optionsMap = {};
    chartData.map( datum => {
        validMetrics.map( metric => {
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
        {validMetrics.map( metric => <div>
            <label>{`${metric} : ${optionsMap[metric].min} - ${optionsMap[metric].max}`}</label><br/>
            <input type="range" max={optionsMap[metric].max} min={optionsMap[metric].min}/>
        </div>)}
    </div>
};
