import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shipActions from '../actions/ship-actions';
// import ShipMap from './ShipMap';

class ShipsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ships = this.props;
    console.log('in ships container');
    console.log(ships);
    return (
      <div>

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ships: state.ships
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(shipActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipsContainer);
