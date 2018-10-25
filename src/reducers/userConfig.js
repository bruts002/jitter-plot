import actions from './actions';

export const initialUserConfig = {
    colors: {
        primary: '#ffee10'
    }
}

export default (state=initialUserConfig, action) => {
    switch (action.type) {
        case actions.PRIMARY_COLOR_CHANGE:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    primary: action.data,
                }
            };
        default:
            return state;
    }
}