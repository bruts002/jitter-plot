import React, { Component } from 'react';

class ActionSelector extends Component {

    isActive(action) {
        return (this.props.action === action ? 'active' : '');
    }

    render() {
      return (
          <div className="actionSelector">
            <ul>
                <li onClick={() => this.props.setAction(ActionSelector.FILTER_DATA)}>
                    <span className={this.isActive(ActionSelector.FILTER_DATA)}>
                        <i className="fa fa-filter" aria-hidden="true"></i>
                     </span>
                </li>
                <li onClick={() => this.props.setAction(ActionSelector.VIEW_SAVED)}>
                    <span className={this.isActive(ActionSelector.VIEW_SAVED)}>
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    </span>
                </li>
                <li onClick={() => this.props.setAction(ActionSelector.VIEW_DETAILS)}>
                    <span className={this.isActive(ActionSelector.VIEW_DETAILS)}>
                        <i className="fa fa-id-card" aria-hidden="true"></i>
                    </span>
                </li>
                <li onClick={() => this.props.setAction(ActionSelector.ADD_PLOT)}>
                    <span className={this.isActive(ActionSelector.ADD_PLOT)}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                </li>
            </ul>
        </div>
      );
    }
}

Object.defineProperties(ActionSelector, {
    VIEW_SAVED:   { value: 'viewSaved'   },
    VIEW_DETAILS: { value: 'viewDetails' },
    ADD_PLOT:     { value: 'addPlot'     },
    FILTER_DATA:  { value: 'filterData'  },
});

export default ActionSelector;