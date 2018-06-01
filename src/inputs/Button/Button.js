import React from 'react';

const Button = ({
  styles,
  onClick,
  display
}) =>
  <button
    onClick={onClick}
    onKeyUp={ e => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick(e);
      }
    }}
    tabIndex='0'
    style={styles}
    className='button'>
    <span>{display}</span>
  </button>

export default Button;
