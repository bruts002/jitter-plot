import actions from './actions';

const chartData = require('../people.json');

const initialState = {
  mode: 'addPlot',
  validMetrics: [
    'bmi',
    'age'
  ],
  plots: [
    { field: 'bmi' }
  ],
  selectedPoint: chartData[0],
  focusedPoint: chartData[0],
  chartData,
};

export default (state=initialState, action) => {
  switch (action.type) {
    case actions.ADD_PLOT:
      return Object.assign({}, state, {
        plots: [...state.plots, action.data]
      });
    case actions.DEL_PLOT:
      return Object.assign({}, state, {
        plots: state.plots.filter( ({field}) => field !== action.data )
      });
    case actions.SET_MODE:
      return Object.assign({}, state, {
        mode: action.data
      });
    case actions.SET_DATA:
      return Object.assign({}, state, {
        plots: [],
        chartData: action.data,
        selectedPoint: action.data[0],
        focusedPoint: action.data[0]
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
