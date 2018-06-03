import {
  max as d3Max,
  min as d3Min
} from 'd3';
import actions from './actions';

export const initialState = {
  loading: false,
  mode: 'viewDetails',
  validMetrics: [],
  plots: [],
  selectedPoint: {},
  focusedPoint:  {},
  chartData: [],
  metricBounds: {},
  configOpen: false,
  __version: 0
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
    case actions.SHOW_CONFIG:
      return Object.assign({}, state, {
        configOpen: action.data
      })
    case actions.DEL_DATA_SET:
      return state;
    case actions.SET_DATA:
      const plots = Object
        .keys(action.data[0])
        .filter( key => !isNaN(+action.data[0][key]));
      return Object.assign({}, state, {
        chartData: action.data,
        selectedPoint: action.data[0],
        focusedPoint: action.data[0],
        validMetrics: plots,
        metricBounds: plots.reduce( (acc,metric) => {
          const metricMax = d3Max(action.data, d => Math.round(d[metric]));
          const metricMin = d3Min(action.data, d => Math.round(d[metric]));
          acc[metric] = {
            upperBound: metricMax,
            lowerBound: metricMin
          };
          return acc;
        }, {}),
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
    case actions.UPDATE_METRIC_BOUNDS:
      return Object.assign({}, state, {
        metricBounds: Object.assign({}, state.metricBounds, {
          [action.data.metric]: action.data.bounds
        })
      });
    default:
      return state;
  }
};
