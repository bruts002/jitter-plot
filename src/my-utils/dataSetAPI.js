const saveData = (name, data) => {
    let savedDataSets = window.localStorage.getItem('savedDataSets');
    if (savedDataSets !== null) {
        savedDataSets = JSON.parse(savedDataSets);
        if (name in savedDataSets) {
            // TODO alert overriding prev entry
        }
    } else {
        savedDataSets = {};
    }
    savedDataSets[name] = true;
    window.localStorage.setItem(
        'savedDataSets',
        JSON.stringify(savedDataSets)
    );
    window.localStorage.setItem(
        name,
        JSON.stringify(data)
    );
};

export default {
    saveData,
};
