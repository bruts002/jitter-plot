import actions from './actions';
import userConfigReducer, { initialUserConfig } from './userConfig';
import dataSetReducer, { initialDataSet } from './dataSet';

export const initialState = {
  loading: false,
  mode: 'viewDetails',
  configOpen: false,
  userConfig: initialUserConfig,
  dataSet: initialDataSet,
  __version: 2
};

export default (state=initialState, action) => {
  switch (action.type) {
    case actions.SET_MODE:
      return Object.assign({}, state, {
        mode: action.data
      });
    case actions.SHOW_CONFIG:
      return Object.assign({}, state, {
        configOpen: action.data
      })
    case actions.PRIMARY_COLOR_CHANGE:
    case actions.UPDATE_PRIMARY_COLOR_DEFAULT:
      return Object.assign({}, state, {
        userConfig: userConfigReducer(state.userConfig, action)
      });
    case actions.UPDATE_METRIC_BOUNDS:
    case actions.SELECT_POINT:
    case actions.FOCUS_POINT:
    case actions.SAVE_DATA_SET:
    case actions.SET_DATA_SET:
    case actions.DEL_DATA_SET:
    case actions.DEL_PLOT:
    case actions.ADD_PLOT:
      return Object.assign({}, state, {
        dataSet: dataSetReducer(state.dataSet, action)
      });
    default:
      return state;
  }
};
