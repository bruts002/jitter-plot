import React from 'react';
import './rangeInput.scss';

export default ({
    min,
    max,
    lowerBound,
    upperBound,
    onChange,
    step = Math.round((max - min) / 10),
    resizerWidth = 10
}) => {
    const scale = 100/(max-min);
    const startWidth = (lowerBound-min)*scale;
    const endWidth = (max-upperBound)*scale;
    const middleWidth = (upperBound-lowerBound)*scale;
    return <div className="range__container">
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
                style={{flexBasis: `${startWidth}%`}}></div>
            <div
                className='range__control'
                style={{flexBasis: `${resizerWidth}px`}}></div>
            <div
                className='range__chunk range__chunk--middle'
                style={{flexBasis: `calc(${middleWidth}% - ${2*resizerWidth}px`}}></div>
            <div
                className='range__control'
                style={{flexBasis: `${resizerWidth}px`}}></div>
            <div
                className='range__chunk range__chunk--end'
                style={{flexBasis: `${endWidth}%`}}></div>
        </div>
    </div>
}
