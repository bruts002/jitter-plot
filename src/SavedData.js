import React, { Component } from 'react';
import DataUploader from './DataUploader';

class SavedData extends Component {
    constructor(props){
        super(props);

        this.state = {
            savedDataNamesArray: this.getSavedDataNames()
        };
    }
    shouldComponentUpdate() {
        var should = false;
        should = this.state.savedDataNamesArray === this.getSavedDataNames();

        return should;
    }
    getSavedDataNames() {
        return Object.keys(
            JSON.parse(
                window.localStorage.getItem('savedDataSets')
            ) || {}
        );
    }

    setData(entry) {
        var savedData = JSON.parse(window.localStorage.getItem(entry));
        this.props.setChartData(savedData);
    }

    setSaved(fileNames) {
        this.setState({
            savedDataNamesArray: fileNames
        });
    }
    render() {
      return (
        <div>
            <h3>Saved Data</h3>
            <ul>
            {this.state.savedDataNamesArray.map( savedData => (
                <li key={savedData}>
                    <span
                        className="saved-data-set"
                        onClick={ () => this.setData(savedData) } >
                        {savedData}
                    </span>
                    <span
                        className="deleteIcon"
                        onClick={ () => this.props.deleteDataSet(savedData) }>
                        <i
                            className="fa fa-times-circle"
                            aria-hidden="true"></i>
                    </span>
                </li>
            ))}
            </ul>
            <DataUploader setChartData={ newData => this.props.setChartData(newData)} />
        </div>
      );
    }
}

export default SavedData;