import actions from "./actions"
import dataSetReducer, { initialDataSet } from "./dataSet"

export const initialState = {
  loading: false,
  configOpen: false,
  dataSet: initialDataSet,
  __version: 2
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_METRIC_BOUNDS:
    case actions.SELECT_POINT:
    case actions.FOCUS_POINT:
    case actions.SAVE_DATA_SET:
    case actions.SET_DATA_SET:
    case actions.DEL_DATA_SET:
    case actions.DEL_PLOT:
    case actions.ADD_PLOT:
      return {
        ...state,
        dataSet: dataSetReducer(state.dataSet, action)
      }
    default:
      return state
  }
}
