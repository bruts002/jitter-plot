import React from 'react';

export default ({
    min,
    max,
    lowerBound,
    upperBound,
    onChange
}) => <div>
    <input
        type='number'
        onChange={ e => onChange({
            lowerBound: +e.target.value,
            upperBound
        })}
        value={lowerBound}
        max={Math.min(max, upperBound)}
        min={min}/>
    <input
        type='number'
        onChange={ e => onChange({
            upperBound: +e.target.value,
            lowerBound
        })}
        value={upperBound}
        max={max}
        min={Math.max(min, lowerBound)}/>
</div>
