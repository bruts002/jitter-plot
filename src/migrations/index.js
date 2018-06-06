import { initialUserConfig } from '../reducers/userConfig';

const migrate = store => {
    switch (store.__version) {
        case 0: store = addUserConfig(store);
        case 1: store = isolateDataSetData(store);
        default:
            return store;
    }
}

const addUserConfig = store => Object.assign({}, store, {
    userConfig: initialUserConfig,
    __version: 1
});

const isolateDataSetData = ({
    loading,
    mode,
    validMetrics,
    plots,
    selectedPoint,
    focusedPoint,
    chartData,
    metricBounds,
    configOpen,
    userConfig,
}) => {
    const localStorageKey = 'savedDataSets';
    const savedDataSetsLS = JSON.parse(window.localStorage.getItem(localStorageKey)) || {};
    window.localStorage.removeItem(localStorageKey);
    const savedDataSets = Object
        .keys(savedDataSetsLS)
        .reduce( (acc, key) => {
            return savedDataSetsLS[key] ?
                [...acc, key] :
                [...acc];
        }, [])
    const selectedDataSet = savedDataSets.length > 0 ? savedDataSets[0] : '';
    return {
        loading,
        mode,
        configOpen,
        userConfig,
        dataSet: {
            data: chartData,
            plots,
            savedDataSets,
            selectedDataSet,
            selectedPoint,
            focusedPoint,
            validMetrics,
            metricBounds,
        },
        __version: 2
    }
};

export default migrate;
