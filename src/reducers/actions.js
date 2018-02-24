const actions = {
    ADD_PLOT: 'ADD_PLOT',
    DEL_PLOT: 'DEL_PLOT',
    SET_MODE: 'SET_MODE',
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

export default actions;
