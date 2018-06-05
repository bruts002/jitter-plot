import React, { Component } from 'react';

import dataSetAPI from './my-utils/dataSetAPI';

function isJSONFile(fileName) {
    return (fileName &&
        fileName !== '' &&
        fileName.length >= 6 &&
        fileName.slice(-5) === '.json');
}

function parseData(contents) {
    var data = false;
    try {
        data = JSON.parse(contents);
    } catch (e) {
        data = false;
    }
    return data;
}

class DataUploader extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    fileHandler(evt) {
        var data = parseData(evt.target.result);
        if (data === false) {
            // TODO: handle bad data type
        } else {
            // save to localstorage
            dataSetAPI.saveData(this.state.fileName, data);
            this.props.setChartData(data);
        }
    }

    onChange(evt) {
        var fileName = evt.target.files[0].name,
            reader;
        if (isJSONFile(fileName)) {
            this.setState({
                fileName: fileName
            });
            reader = new FileReader();
            reader.onload = this.fileHandler.bind(this);
            reader.readAsText(evt.target.files[0]);
        } else {
            //TODO: handle bad file type
        }
    }

    render() {
        return (
            <div>
                <h3>Upload Data</h3>
                <input
                    type="file"
                    onChange={this.onChange}
                    name="chartData" />
            </div>
        );
    }
}

export default DataUploader;

