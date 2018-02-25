import React from 'react';

const style = {
  border: '2px solid gray',
  borderRadius: '5px',
  padding: '5px',
  margin: '5px',
  borderColor: 'gray'
};

const PointViewer = props => {
  const keys = Object.keys(props.selectedPoint);
  return (
    <div
      className='pointCard'
      style={style}>
        { keys.map( key => {
          return <div key={key}>
            {key}: {props.selectedPoint[key]}
          </div>
        })}
    </div>
  );
}

export default PointViewer;
