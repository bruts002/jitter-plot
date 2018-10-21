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
            return {
                ...state,
                selectedPoint: action.data
            };
        case actions.FOCUS_POINT:
            return {
                ...state,
                focusedPoint: action.data
            };
        case actions.UPDATE_METRIC_BOUNDS:
            return {
                ...state,
                metricBounds: {
                    ...state.metricBounds,
                    [action.data.metric]: action.data.bounds
                }
            };
        // PLOT STUFF
        case actions.ADD_PLOT:
            return {
                ...state,
                plots: state.plots.indexOf(action.data) === -1 ?
                    [...state.plots, action.data] :
                    [...state.plots]
            };
        case actions.DEL_PLOT:
            return {
                ...state,
                plots: state.plots.filter( plot => plot !== action.data )
            };
        // DATA SET STUFF
        case actions.SAVE_DATA_SET:
            saveData(action.data.name, action.data.data);
            return {
                ...state,
                savedDataSets: [...state.savedDataSets, action.data.name]
            };
        case actions.DEL_DATA_SET:
            deleteData(action.data);
            return {
                ...state,
                savedDataSets: state.savedDataSets.filter( dataSet => dataSet !== action.data )
            };
        case actions.SET_DATA_SET:
            const data = getData(action.data);
            const plots = Object
                .keys(data[0])
                .filter( key => !isNaN(+data[0][key]) && data[0][key] !== '');
            return {
                ...state,
                data,
                selectedDataSet: action.data,
                selectedPoint: data[0],
                focusedPoint: data[0],
                validMetrics: plots,
                metricBounds: plots.reduce( (acc,metric) => ({
                    ...acc,
                    [metric]: {
                        upperBound: d3Max(data, d => Math.round(d[metric])),
                        lowerBound: d3Min(data, d => Math.round(d[metric]))
                    }
                }), {}),
                plots
            };
        default:
            return state;
    }
}
