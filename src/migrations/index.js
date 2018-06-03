import { initialUserConfig } from '../reducers/userConfig';

const migrate = store => {
    switch (store.__version) {
        case 0: store = addUserConfig(store);
    }
    return store;
}

const addUserConfig = store => {
    return Object.assign({}, store, {
        userConfig: initialUserConfig,
        __version: 1
    });
}

export default migrate;
