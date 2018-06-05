import {
    max as d3Max,
    min as d3Min
} from 'd3';
import actions from './actions';

export const initialDataSet = {
    data: [],
    plots: [],
    selectedPoint: {},
    focusedPoint:  {},
    validMetrics: [],
    metricBounds: {},
};

export default (state=initialDataSet, action) => {
    switch (action.type) {
        // POINT STUFF
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
        // PLOT STUFF
        case actions.ADD_PLOT:
            return Object.assign({}, state, {
                plots: [...state.plots, action.data]
            });
        case actions.DEL_PLOT:
            return Object.assign({}, state, {
                plots: state.plots.filter( plot => plot !== action.data )
            });
        // DATA SET STUFF
        case actions.DEL_DATA_SET:
            return state;
        case actions.SET_DATA_SET:
            const plots = Object
                .keys(action.data[0])
                .filter( key => !isNaN(+action.data[0][key]));
            return Object.assign({}, state, {
                data: action.data,
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
        default:
            return state;
    }
}
