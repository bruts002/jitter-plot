import React from 'react';

const style = {
  border: '2px solid gray',
  borderRadius: '5px',
  padding: '5px',
  margin: '5px',
  borderColor: 'gray'
};

const PointViewer = ({ selectedPoint }) => {
  const keys = Object.keys(selectedPoint);
  return (
    <div className='pointCard' style={style}>
      {keys.map(key => (
        <div key={key}>{`${key}: ${selectedPoint[key]}`}</div>
      ))}
    </div>
  );
};

export default PointViewer;
