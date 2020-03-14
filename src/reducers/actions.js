const actions = {
  ADD_PLOT: "ADD_PLOT",
  DEL_PLOT: "DEL_PLOT",
  SET_MODE: "SET_MODE",
  SELECT_POINT: "SELECT_POINT",
  FOCUS_POINT: "FOCUS_POINT",
  UPDATE_METRIC_BOUNDS: "UPDATE_METRIC_BOUNDS",
  // data set actions
  SAVE_DATA_SET: "SAVE_DATA_SET",
  SET_DATA_SET: "SET_DATA_SET",
  DEL_DATA_SET: "DEL_DATA_SET"
}

export const addPlot = metric => ({
  type: actions.ADD_PLOT,
  data: metric
})

export const delPlot = field => ({
  type: actions.DEL_PLOT,
  data: field
})

export const setMode = mode => ({
  type: actions.SET_MODE,
  data: mode
})

export const saveDataSet = (name, data) => ({
  type: actions.SAVE_DATA_SET,
  data: {
    name,
    data
  }
})

export const deleteDataSet = dataSet => ({
  type: actions.DEL_DATA_SET,
  data: dataSet
})

export const setDataSet = data => ({
  type: actions.SET_DATA_SET,
  data
})

export const selectPoint = point => ({
  type: actions.SELECT_POINT,
  data: point
})

export const focusPoint = point => ({
  type: actions.FOCUS_POINT,
  data: point
})

export const updateMetricBounds = (metric, data) => ({
  type: actions.UPDATE_METRIC_BOUNDS,
  data: {
    bounds: data,
    metric
  }
})

export default actions
