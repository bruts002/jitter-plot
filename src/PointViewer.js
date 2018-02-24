import React from 'react';

const style = {
  border: '2px solid gray',
  borderRadius: '5px',
  padding: '5px',
  margin: '5px'
};

const PointViewer = props => {
  const keys = Object.keys(props.selectedPoint);
  const pointStyle = Object.assign({}, style);

  if (props.selectedPoint === props.focusedPoint) {
    if (props.primaryColor) {
      pointStyle.borderColor = props.primaryColor;
    } else {
      pointStyle.borderColor = '#db4437';
    }
  } else {
    pointStyle.borderColor = 'gray';
  }
  return (
    <div
      className='pointCard'
      style={pointStyle}>
        { keys.map( key => {
          return <div key={key}>
            {key}: {props.selectedPoint[key]}
          </div>
        })}
    </div>
  );
}

export default PointViewer;
