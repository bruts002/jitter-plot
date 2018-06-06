import React from 'react';
import DataUploader from './DataUploader';

export default ({
    // state
    savedDataSets,
    // actions
    saveDataSet,
    setChartData,
    deleteDataSet
}) => <div>
    <h3>Saved Data</h3>
    <ul>
    {savedDataSets.map( savedData => (
        <li key={savedData}>
            <span
                className="saved-data-set"
                onClick={ () => setChartData(savedData) } >
                {savedData}
            </span>
            <span
                className="deleteIcon"
                onClick={ () => deleteDataSet(savedData) }>
                <i
                    className="fa fa-times-circle"
                    aria-hidden="true"></i>
            </span>
        </li>
    ))}
    </ul>
    <DataUploader
        saveDataSet={ saveDataSet }
        setChartData={ setChartData } />
</div>
