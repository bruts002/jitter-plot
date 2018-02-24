import React, { Component } from 'react';

import Button from './inputs/Button';

const styles = {
    button: {
       marginLeft: "auto",
       marginRight: "auto"
    }
};

class PlotAdder extends Component {

    handleFieldChange({target: {value}}) {
        this.setState({
            selectedField: value
        });
    }

    submit(event) {
        event.preventDefault();
        this.props.addPlot( this.state.selectedField );
    }


    render() {
      return (
        <div>
            <h3>Add Plot</h3>
            <form onSubmit={ e => this.submit(e) }>
                <label htmlFor='field'>Field</label>    
                <select onChange={ e => this.handleFieldChange(e) } >
                    {
                        this.props.validMetrics.map( (key) => (
                            <option
                                name='field'
                                value={key}
                                key={key}>
                                {key}
                            </option>
                        ))
                    }
                </select>
                <br />
                <Button
                    styles={styles.button}
                    type='submit'
                    display='Add'
                    onClick={ e => this.submit(e) } />
            </form>
        </div>
      );
    }
}

export default PlotAdder;
