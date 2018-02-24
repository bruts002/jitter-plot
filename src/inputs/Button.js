import React, { Component } from 'react';

const Button = props => {
    const {
      styles,
      onClick,
      display
    } = props;
    return (
      <div onClick={onClick}
            onKeyUp={ e => {
              if (e.keyCode === 13 || e.keyCode === 32) {
                onClick(e);
              }
            }}
            tabIndex="0"
            style={styles}
            className='button'>
          <span>{display}</span>
      </div>
    );
};

export default Button;
