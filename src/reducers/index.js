import actions from './actions';

const initialState = {
  mode: 'addPlot',
  validMetrics: [
    'bmi',
    'age'
  ],
  plots: [
    { field: 'bmi' }
  ]
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
    default:
      return state;
  }
};
