import React from 'react';
import Button from './inputs/Button/Button';
import { connect } from 'react-redux';
import {
    showConfig,
    changePrimaryColor,
    updatePrimaryColorDefault
} from './reducers/actions';

const UserConfig = ({
    configOpen,
    showConfig,
    changePrimaryColor,
    userConfig,
    updatePrimaryColorDefault
}) => <div
    className={`jp-ctrl__config ${configOpen ? 'jp-ctrl__config--show' : ''}`}>
    <h2>Config</h2>
    <hr/>
    <h3>Colors</h3>

    <div className='jp-ctrl__config-option'>
        <input
            type='checkbox'
            name='primaryColorDefault'
            value={userConfig.colors.primary.default}
            onChange={ ({target: {checked}}) => updatePrimaryColorDefault(checked)}
            />
        <label htmlFor='primaryColor'>Primary</label>
        <input
            type='text'
            name='primaryColor'
            disabled={userConfig.colors.primary.default}
            onChange={ ({target: {value}}) => changePrimaryColor(value) }
            value={userConfig.colors.primary.value} />
    </div>
    <Button
        display='OK'
        styles={{
            bottom: '30px',
            right: '100px' 
        }}
        onClick={ () => showConfig(false)}
        />
</div>

const mapStateToProps = ({
    configOpen,
    userConfig,
}) => ({
    configOpen,
    userConfig,
});

const mapDispatchToProps = dispatch => ({
    showConfig: show => { dispatch(showConfig(show)) },
    changePrimaryColor: color => { dispatch(changePrimaryColor(color)) },
    updatePrimaryColorDefault: value => { dispatch(updatePrimaryColorDefault(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserConfig);
