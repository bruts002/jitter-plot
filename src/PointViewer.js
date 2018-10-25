import React from 'react';
import './PointViewer.scss';

const PointViewer = ({ selectedPoint }) => {
  const keys = Object.keys(selectedPoint);
  return (
    <div className='point-card'>
      {keys.map(key => (
        <div key={key}>{`${key}: ${selectedPoint[key]}`}</div>
      ))}
    </div>
  );
};

export default PointViewer;
