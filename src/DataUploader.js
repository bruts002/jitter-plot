import React from 'react';

const isJSONFile = fileName => (
    fileName &&
    fileName.length >= 6 &&
    fileName.slice(-5) === '.json');

const parseData = contents => {
    try {
        return JSON.parse(contents);
    } catch (e) {
        return false;
    }
};

export default ({
    saveDataSet,
    setChartData,
}) => <div>
    <h3>Upload Data</h3>
    <input
        type='file'
        multiple
        onChange={ ({target: { files } }) => {
            [].forEach.call(files, (file,idx) => {
                const fileName = file.name;
                const reader = new FileReader();
                if (isJSONFile(fileName)) {
                    reader.onload = ({target: { result }}) => {
                        const data = parseData(result);
                        if (data === false) {
                            // TODO: handle bad data type
                        } else {
                            saveDataSet(fileName, data);
                            if (idx === 0) {
                                setChartData(fileName);
                            }
                        }
                    };
                    reader.readAsText(file);
                } else {
                    //TODO: handle bad file type
                }
            });
        }}
        name="chartData" />
</div>
