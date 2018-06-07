import {
    max as d3Max,
    min as d3Min
} from 'd3';
import {
    getData,
    saveData,
    deleteData,
} from '../my-utils/dataSetAPI';

import actions from './actions';

export const initialDataSet = {
    data: [],
    plots: [],
    savedDataSets: [],
    selectedDataSet: '',
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
                plots: state.plots.indexOf(action.data) === -1 ?
                    [...state.plots, action.data] :
                    [...state.plots]
            });
        case actions.DEL_PLOT:
            return Object.assign({}, state, {
                plots: state.plots.filter( plot => plot !== action.data )
            });
        // DATA SET STUFF
        case actions.SAVE_DATA_SET:
            saveData(action.data.name, action.data.data);
            return Object.assign({}, state, {
                savedDataSets: [...state.savedDataSets, action.data.name]
            });
        case actions.DEL_DATA_SET:
            deleteData(action.data);
            return Object.assign({}, state, {
                savedDataSets: state.savedDataSets.filter( dataSet => dataSet !== action.data )
            });
        case actions.SET_DATA_SET:
            const data = getData(action.data);
            const plots = Object
                .keys(data[0])
                .filter( key => !isNaN(+data[0][key]) && data[0][key] !== '');
            return Object.assign({}, state, {
                data,
                selectedDataSet: action.data,
                selectedPoint: data[0],
                focusedPoint: data[0],
                validMetrics: plots,
                metricBounds: plots.reduce( (acc,metric) => {
                    const metricMax = d3Max(data, d => Math.round(d[metric]));
                    const metricMin = d3Min(data, d => Math.round(d[metric]));
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
