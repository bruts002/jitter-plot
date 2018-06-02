import React from 'react';

export default ({
    min,
    max,
    lowerBound,
    upperBound,
    onChange,
    step = Math.round((max - min) / 10),
    resizerWidth = 10
}) => <div className="range__container">
    <div className="range__inputs">
        <input
            type='number'
            onChange={ e => onChange({
                lowerBound: +e.target.value,
                upperBound
            })}
            step={step}
            value={lowerBound}
            max={Math.min(max, upperBound)}
            min={min}/>
        <input
            type='number'
            onChange={ e => onChange({
                upperBound: +e.target.value,
                lowerBound
            })}
            step={step}
            value={upperBound}
            max={max}
            min={Math.max(min, lowerBound)}/>
    </div>
    <div className='range__slider'>
        <div
            className='range__chunk range__chunk--start'
            style={{flexBasis: `${((lowerBound-min)/(max-min))*100}%`}}></div>
        <div
            className='range__control'
            style={{flexBasis: `${resizerWidth}px`}}></div>
        <div
            className='range__chunk range__chunk--middle'
            style={{flexBasis: `calc(${((upperBound-lowerBound)/(max-min))*100}% - ${2*resizerWidth}px`}}></div>
        <div
            className='range__control'
            style={{flexBasis: `${resizerWidth}px`}}></div>
        <div
            className='range__chunk range__chunk--end'
            style={{flexBasis: `${((max-upperBound)/(max-min))*100}%`}}></div>
    </div>
</div>
