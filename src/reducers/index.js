import actions from './actions';

const chartData = require('../people.json');

const initialState = {
  loading: false,
  mode: 'viewDetails',
  validMetrics: [
    'bmi',
    'age'
  ],
  plots: [ 'bmi' ],
  selectedPoint: {},
  focusedPoint:  {},
  chartData: []
};

export default (state=initialState, action) => {
  switch (action.type) {
    case actions.ADD_PLOT:
      return Object.assign({}, state, {
        plots: [...state.plots, action.data]
      });
    case actions.DEL_PLOT:
      return Object.assign({}, state, {
        plots: state.plots.filter( plot => plot !== action.data )
      });
    case actions.SET_MODE:
      return Object.assign({}, state, {
        mode: action.data
      });
    case actions.SET_DATA:
      const plots = Object
        .keys(action.data[0])
        .filter( key => typeof action.data[0][key] === 'number');
      return Object.assign({}, state, {
        chartData: action.data,
        selectedPoint: action.data[0],
        focusedPoint: action.data[0],
        validMetrics: plots,
        plots
      });
    case actions.SELECT_POINT:
      return Object.assign({}, state, {
        selectedPoint: action.data
      });
    case actions.FOCUS_POINT:
      return Object.assign({}, state, {
        focusedPoint: action.data
      });
    default:
      return state;
  }
};
