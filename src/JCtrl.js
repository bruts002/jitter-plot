import React from 'react';

import Loading from './my-utils/Loading';
import PointViewer from './PointViewer';
import SavedData from './SavedData';
import FilterData from './FilterData';
import PlotAdder from './PlotAdder';
import ActionSelector from './ActionSelector';

export default props =>
    <div className='jp-ctrl'>
        { renderHeader(props) }
        <hr/>
        { renderAction(props) }
        <ActionSelector
            action={props.mode}
            setAction={ action => props.setMode(action)} />
    </div>

const renderHeader = ({
    selectedPoint,
    selectPoint,
    chartData,
    validMetrics,
    mode,
    setMode
}) => <div>
    <label htmlFor='agent'>Agent</label>
    <select
        name='agent'
        value={selectedPoint.id}
        onChange={getAgentOnChange(chartData, selectPoint)}>
        {chartData.map( (point,idx) => (
            <option
                key={point.id}
                value={point.id}>
                {point.name || point.first_name || point[validMetrics[0]]}
            </option>
        ))}
    </select>
</div>

const getAgentOnChange = (chartData, selectPoint) => event => {
    const id = +event.target.value;
    let point;
    chartData.some( data => {
        if (data.id === id) {
            point = data;
        }
        return point
    })
    selectPoint(point);
}

const renderAction = ({
    loading,
    mode,
    validMetrics,
    addPlot,
    deleteDataSet,
    setData,
    chartData,
    metricBounds,
    updateMetricBounds,
    focusedPoint,
    selectedPoint
}) => {
    if (loading) {
        return <Loading />
    }
    switch (mode) {
        case ActionSelector.ADD_PLOT:
            return <PlotAdder
                validMetrics={ validMetrics }
                addPlot={ metric => addPlot(metric) } />
        case ActionSelector.VIEW_SAVED:
            return <SavedData
                deleteDataSet={ dataSet => deleteDataSet(dataSet) }
                setChartData={ newData => setData(newData)} />
        case ActionSelector.FILTER_DATA:
            return <FilterData
                chartData={ chartData }
                validMetrics={ validMetrics }
                metricBounds={ metricBounds }
                updateMetricBounds={ updateMetricBounds }
                />
        case ActionSelector.VIEW_DETAILS:
            return <PointViewer
                focusedPoint={focusedPoint}
                selectedPoint={selectedPoint} />
        default:
            return <div>Unknown mode</div>
    }
}
