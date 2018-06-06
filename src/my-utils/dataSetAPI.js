const storage = window.localStorage;

export const getData = name => JSON.parse(storage.getItem(name));

export const saveData = (name, data) => {
    storage.setItem(
        name,
        JSON.stringify(data)
    );
};

export const deleteData = name => storage.removeItem(name);
