const actions = {
    ADD_PLOT: 'ADD_PLOT',
    DEL_PLOT: 'DEL_PLOT',
    SET_MODE: 'SET_MODE',
    SHOW_CONFIG: 'SHOW_CONFIG',
    SAVE_DATA: 'SAVE_DATA',
    SET_DATA: 'SET_DATA',
    DEL_DATA_SET: 'DEL_DATA_SET',
    SELECT_POINT: 'SELECT_POINT',
    FOCUS_POINT: 'FOCUS_POINT',
    UPDATE_METRIC_BOUNDS: 'UPDATE_METRIC_BOUNDS',
    // user config actions
    UPDATE_PRIMARY_COLOR_DEFAULT: 'UPDATE_PRIMARY_COLOR_DEFAULT',
    PRIMARY_COLOR_CHANGE: 'PRIMARY_COLOR_CHANGE',
};

export const addPlot = metric => ({
    type: actions.ADD_PLOT,
    data: metric
});

export const delPlot = field => ({
    type: actions.DEL_PLOT,
    data: field
});

export const setMode = mode => ({
    type: actions.SET_MODE,
    data: mode
});

export const showConfig = data => ({
    type: actions.SHOW_CONFIG,
    data
})

export const deleteDataSet = dataSet => ({
    type: actions.DEL_DATA_SET,
    data: dataSet
});

export const setData = data => ({
    type: actions.SET_DATA,
    data
});

export const saveData = file => ({
    type: actions.SAVE_DATA,
    data: file
});

export const selectPoint = point => ({
    type: actions.SELECT_POINT,
    data: point
});

export const focusPoint = point => ({
    type: actions.FOCUS_POINT,
    data: point
});

export const updateMetricBounds = (metric, data) => ({
    type: actions.UPDATE_METRIC_BOUNDS,
    data: {
        bounds: data,
        metric
    }
});

export const changePrimaryColor = color => ({
    type: actions.PRIMARY_COLOR_CHANGE,
    data: color
});

export const updatePrimaryColorDefault = data => ({
    type: actions.UPDATE_PRIMARY_COLOR_DEFAULT,
    data
})

export default actions;
