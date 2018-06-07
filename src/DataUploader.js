import React from 'react';

import csvParser from './my-utils/csvParser';

const VALID_TYPES = [{
    extension: '.json',
    types: ['application/json']
},{
    extension: '.csv',
    types: ['text/csv', 'application/vnd.ms-excel']
}];

const isValidFileType = ({
    name,
    type
}) => VALID_TYPES.some( ({
    extension,
    types
}) =>
    name.search(`${extension}$`) !== -1 && types.indexOf(type) !== -1
);

const parseData = (contents,type) => {
    switch (type) {
        case 'application/json':
            try {
                return JSON.parse(contents);
            } catch (e) {
                return false;
            }
        case 'text/csv':
        case 'application/vnd.ms-excel':
            try {
                return csvParser(contents);
            } catch (e) {
                return false;
            }
        default:
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
                if (isValidFileType(file)) {
                    reader.onload = ({target: { result }}) => {
                        const data = parseData(result, file.type);
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
