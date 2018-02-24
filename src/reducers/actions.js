const actions = {
    ADD_PLOT: 'ADD_PLOT',
    DEL_PLOT: 'DEL_PLOT',
    SET_MODE: 'SET_MODE',
    SET_DATA: 'SET_DATA',
    SELECT_POINT: 'SELECT_POINT',
    FOCUS_POINT: 'FOCUS_POINT'
};

export const addPlot = field => ({
    type: actions.ADD_PLOT,
    data: { field }
});

export const delPlot = field => ({
    type: actions.DEL_PLOT,
    data: field
});

export const setMode = mode => ({
    type: actions.SET_MODE,
    data: mode
});

export const setData = data => ({
    type: actions.SET_DATA,
    data
});

export const selectPoint = point => ({
    type: actions.SELECT_POINT,
    data: point
});

export const focusPoint = point => ({
    type: actions.FOCUS_POINT,
    data: point
});

export default actions;
