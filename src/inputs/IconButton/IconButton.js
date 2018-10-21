import React from 'react';
import './iconButton.scss';

export default ({
  icon,
  size = 20,
}) => (
  <i
    className={`fa fa-${icon} icon-button`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      lineHeight: `${size}px`,
      fontSize: `${size}px`,
    }}
    aria-hidden="true"></i>
);
