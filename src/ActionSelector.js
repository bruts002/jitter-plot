import React, { Component } from 'react';

/**
 * TODO: have the primary color by dynamic (or default if none) using this.props.primaryColor
 */
class ActionSelector extends Component {
    isActive(action) {
        return (this.props.action === action ? 'active' : '');
    }

    render() {
      return (
          <div className="actionSelector">
            <ul>
                <li onClick={() => this.props.setAction('upload')}>
                    <span className={this.isActive('upload')}>
                        <i className="fa fa-upload" aria-hidden="true"></i>
                     </span>
                </li>
                <li onClick={() => this.props.setAction('viewSaved')}>
                    <span className={this.isActive('viewSaved')}>
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    </span>
                </li>
                <li onClick={() => this.props.setAction('viewDetails')}>
                    <span className={this.isActive('viewDetails')}>
                        <i className="fa fa-id-card" aria-hidden="true"></i>
                    </span>
                </li>
                <li onClick={() => this.props.setAction('addPlot')}>
                    <span className={this.isActive('addPlot')}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                </li>
            </ul>
        </div>
      );
    }
}

export default ActionSelector;