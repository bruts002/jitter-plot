export const getData = name => JSON.parse(window.localStorage.getItem(name));

export const saveData = (name, data) => {
    window.localStorage.setItem(
        name,
        JSON.stringify(data)
    );
};

export const deleteDataSet = dataSet => {
    // TODO!
};
