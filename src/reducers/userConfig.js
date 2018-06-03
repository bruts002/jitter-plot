import actions from './actions';

export const initialUserConfig = {
    colors: {
        primary: false
    }
}

export default (state=initialUserConfig, action) => {
    switch (action.type) {
        case actions.PRIMARY_COLOR_CHANGE:
            return Object.assign({}, state, {
                primary: action.data
            });
        default:
            return state;
    }
}