import React from 'react';

const style = {
  border: '2px solid gray',
  borderRadius: '5px',
  padding: '5px',
  margin: '5px'
};

const PointViewer = props => {
  const keys = Object.keys(props.selectedPoint);

  if (props.selectedPoint === props.focusedPoint) {
    if (props.primaryColor) {
      style.borderColor = props.primaryColor;
    } else {
      style.borderColor = '#db4437';
    }
  } else {
    style.borderColor = 'gray';
  }
  return (
    <div
      className='pointCard'
      style={style}>
        { keys.map( key => {
          return <div>
            {key}: {props.selectedPoint[key]}
          </div>
        })}
    </div>
  );
}

export default PointViewer;
