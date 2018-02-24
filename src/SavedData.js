import React, { Component } from 'react';

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
        var savedDataNames = JSON.parse(window.localStorage.getItem('savedDataNames')),
            savedDataNamesArray = [];
        for (var key in savedDataNames) {
            savedDataNamesArray.push(key);
        }
        return savedDataNamesArray;
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
                <li
                    onClick={ () => this.setData(savedData) }
                    key={savedData}>{savedData}</li>
            ))}
            </ul>
        </div>
      );
    }
}

export default SavedData;