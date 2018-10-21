import React from 'react';
import './circleButton.scss';

export default ({
    onClick,
    isActive,
    fontIcon = 'circle'
}) => <div
    className='circle-button'
    onClick={onClick}
    onKeyUp={ e => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            onClick(e);
        }
    }}
    tabIndex='0'>
    <span className={isActive ? 'active' : ''}>
        <i className={`fa fa-${fontIcon}`} aria-hidden='true'></i>
    </span>
</div>
