import React from 'react';

import Loading from './my-utils/Loading';
import CircleButton from './inputs/CircleButton/CircleButton';
import Button from './inputs/Button/Button';
import PointViewer from './PointViewer';
import SavedData from './SavedData';
import FilterData from './FilterData';
import PlotAdder from './PlotAdder';
import ActionSelector, { USER_ACTIONS } from './ActionSelector';

import { connect } from 'react-redux';
import {
    addPlot,
    delPlot,
    setMode,
    showConfig,
    setData,
    deleteDataSet,
    selectPoint,
    focusPoint,
    updateMetricBounds,
    changePrimaryColor
} from './reducers/actions';

const JCtrl = props =>
    <div className='jp-ctrl'>
        { renderConfig(props) }
        { renderHeader(props) }
        <hr/>
        { renderAction(props) }
        <ActionSelector
            action={props.mode}
            setAction={props.setMode} />
    </div>

const renderConfig = ({
    configOpen,
    showConfig,
    changePrimaryColor,
    userConfig
}) => <div
    className={`jp-ctrl__config ${configOpen ? 'jp-ctrl__config--show' : ''}`}>
    <h2>Config</h2>
    <hr/>
    <h3>Colors</h3>

    <label htmlFor='primaryColor'>Primary</label>
    <input
        type='text'
        name='primaryColor'
        onChange={ ({target: {value}}) => changePrimaryColor(value) }
        value={userConfig.colors.primary} />

    <Button
        display='OK'
        styles={{
            bottom: '30px',
            right: '100px' 
        }}
        onClick={ () => showConfig(false)}
        />
</div>

const renderHeader = ({
    showConfig,
    selectedPoint,
    selectPoint,
    chartData,
    validMetrics,
    mode,
    setMode
}) => <div className='jp-ctrl__header'>
    <div>
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
    <CircleButton
        fontIcon='cog'
        isActive=''
        onClick={ () => showConfig(true)} />
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
        case USER_ACTIONS.ADD_PLOT:
            return <PlotAdder
                validMetrics={ validMetrics }
                addPlot={ metric => addPlot(metric) } />
        case USER_ACTIONS.VIEW_SAVED:
            return <SavedData
                deleteDataSet={ dataSet => deleteDataSet(dataSet) }
                setChartData={ newData => setData(newData)} />
        case USER_ACTIONS.FILTER_DATA:
            return <FilterData
                chartData={ chartData }
                plots={ plots }
                metricBounds={ metricBounds }
                updateMetricBounds={ updateMetricBounds }
                />
        case USER_ACTIONS.VIEW_DETAILS:
            return <PointViewer
                focusedPoint={focusedPoint}
                selectedPoint={selectedPoint} />
        default:
            return <div>Unknown mode</div>
    }
}
const mapStateToProps = ({
    mode,
    configOpen,
    plots,
    validMetrics,
    metricBounds,
    chartData,
    selectedPoint,
    focusedPoint,
    loading,
    userConfig,
}) => ({
    mode,
    configOpen,
    plots,
    validMetrics,
    metricBounds,
    chartData,
    selectedPoint,
    focusedPoint,
    loading,
    userConfig,
})

const mapDispatchToProps = dispatch => ({
    addPlot: metric => { dispatch(addPlot(metric)) },
    delPlot: metric => { dispatch(delPlot(metric))},
    setMode: mode => { dispatch(setMode(mode))},
    setData: data => { dispatch(setData(data))},
    showConfig: show => { dispatch(showConfig(show))},
    deleteDataSet: dataSet => { dispatch(deleteDataSet(dataSet))},
    selectPoint: point => { dispatch(selectPoint(point))},
    focusPoint: point => { dispatch(focusPoint(point))},
    updateMetricBounds: (metric,data) => { dispatch(updateMetricBounds(metric,data)) },
    changePrimaryColor: color => { dispatch(changePrimaryColor(color))}
})

export default connect(mapStateToProps, mapDispatchToProps)(JCtrl);
