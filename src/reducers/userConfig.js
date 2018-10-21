import actions from './actions';

export const initialUserConfig = {
    colors: {
        primary: { value: '', default: true }
    }
}

export default (state=initialUserConfig, action) => {
    switch (action.type) {
        case actions.PRIMARY_COLOR_CHANGE:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    primary: {
                        value: action.data,
                        default: state.colors.primary.default,
                    }
                }
            };
        case actions.UPDATE_PRIMARY_COLOR_DEFAULT:
            return {
                ...state,
                colors: {
                    ...state.colors,
                    primary: {
                        value: state.colors.primary.value,
                        default: action.data
                    }
                }
            };
        default:
            return state;
    }
}