import React, { Component } from 'react';

import Button from './inputs/Button';

const styles = {
    button: {
       marginLeft: "auto",
       marginRight: "auto"
    }
};

class PlotAdder extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            selectedField: props.chartKeys[0]
        };
    }

    handleFieldChange({target: {value}}) {
        this.setState({
            selectedField: value
        });
    }

    addJPlot(event) {
        event.preventDefault();
        if (this.state.selectedField !== undefined) {
            this.props.addJPlot({
                field: this.state.selectedField
            });
        }
    }


    render() {
      return (
        <div>
            <h3>Add Plot</h3>
            <form onSubmit={ e => this.addJPlot(e) }>
                <label htmlFor='field'>Field</label>    
                <select onChange={ e => this.handleFieldChange(e) } >
                    {
                        this.props.chartKeys.map( (key) => (
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
                    onClick={ e => this.addJPlot(e) } />
            </form>
        </div>
      );
    }
}

export default PlotAdder;