import React, { Component } from 'react';
import DataUploader from './DataUploader';
import dataSetAPI from './my-utils/dataSetAPI';

class SavedData extends Component {
    constructor(props){
        // TODO: have this be a funciton, not class
        // TODO: don't call localstorage here, have the reducer do that
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
            )
        );
    }

    setData(entry) {
        const savedData = dataSetAPI.getData(entry);
        this.props.setData(savedData);
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
           <DataUploader
                setData={ this.props.setData }
                saveData={ this.props.saveData } />
        </div>
      );
    }
}

export default SavedData;