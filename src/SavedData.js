import React from "react"
import DataUploader from "./DataUploader"
import IconButton from "./inputs/IconButton/IconButton"
import "./savedData.scss"

export default ({
  // state
  savedDataSets,
  // actions
  saveDataSet,
  setChartData,
  deleteDataSet
}) => (
  <div>
    <h3>Saved Data</h3>
    <ul>
      {savedDataSets.map(savedData => (
        <li className='saved-data-set' key={savedData}>
          {/* TODO: radio inputs here, with htmlFor props on span(which should be label) */}
          <span
            className='saved-data-set__title'
            onClick={() => setChartData(savedData)}
          >
            {savedData}
          </span>
          <span onClick={() => deleteDataSet(savedData)}>
            <IconButton icon='times-circle' />
          </span>
        </li>
      ))}
    </ul>
    <DataUploader saveDataSet={saveDataSet} setChartData={setChartData} />
  </div>
)
