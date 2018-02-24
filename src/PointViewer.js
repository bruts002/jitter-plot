import React from 'react';

const style = {
  border: '2px solid gray',
  borderRadius: '5px',
  padding: '5px',
  margin: '5px'
};

const PointViewer = props => {
  const {
    name,
    age,
    bmi
  } = props.selectedPoint;

  let dname = name;

  if (props.selectedPoint.first_name) {
    dname = props.selectedPoint.first_name;
  }

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
        Name: {dname} <br />
        Age: {age} <br/>
        BMI: {bmi} <br/>
    </div>
  );
}

export default PointViewer;
