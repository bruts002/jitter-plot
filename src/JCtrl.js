import React from 'react';

import Loading from './my-utils/Loading';
import PointViewer from './PointViewer';
import SavedData from './SavedData';
import FilterData from './FilterData';
import PlotAdder from './PlotAdder';
import ActionSelector from './ActionSelector';

import { connect } from 'react-redux';
import {
    addPlot,
    delPlot,
    setMode,
    setData,
    deleteDataSet,
    selectPoint,
    focusPoint,
    updateMetricBounds
} from './reducers/actions';

const JCtrl = props =>
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
    selectedPoint,
    plots
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
                plots={ plots }
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
const mapStateToProps = ({
    mode,
    plots,
    validMetrics,
    metricBounds,
    chartData,
    selectedPoint,
    focusedPoint,
    loading,
}) => ({
    mode,
    plots,
    validMetrics,
    metricBounds,
    chartData,
    selectedPoint,
    focusedPoint,
    loading,
})

const mapDispatchToProps = dispatch => ({
    addPlot: metric => { dispatch(addPlot(metric)) },
    delPlot: metric => { dispatch(delPlot(metric))},
    setMode: mode => { dispatch(setMode(mode))},
    setData: data => { dispatch(setData(data))},
    deleteDataSet: dataSet => { dispatch(deleteDataSet(dataSet))},
    selectPoint: point => { dispatch(selectPoint(point))},
    focusPoint: point => { dispatch(focusPoint(point))},
    updateMetricBounds: (metric,data) => { dispatch(updateMetricBounds(metric,data)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(JCtrl);
