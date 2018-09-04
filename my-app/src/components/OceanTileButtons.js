import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shipActions from '../actions/ship-actions';
import ShipsContainer from './ShipsContainer'


class OceanTileButtons extends Component {
  constructor(props) {
    super(props);
    this.onAddShipClick = this.onAddShipClick.bind(this);
    //
    // this.state = {
    //   ocean_tiles: Array(100).fill(null),
    // }
  }

  onAddShipClick(index) {
    // console.log(this.props);

    // this.props.addShip({
    //   baseIndex: index,
    // });
    // store.dispatch(addShip(index))

    // console.log('shipIndex is...');
    // console.log(index);
  }

  render() {
    console.log(ocean_tiles);

    return (


      // <div>
      //   <input id="firstname" type="text" placeholder="First Name" />
      //   <input id="lastname" type="text" placeholder="Last Name" />
      //   <button onClick={this.onAddShipClick}>Add Person</button>
      // </div>
      //
      <div className="tile-set">
        {this.state.ocean_tiles.map((item, index) =>
          (<button className="ocean-tile"
            value={"ocean-" + index}
            onClick={() => {this.onAddShipClick(index)}}>
           </button>)
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ocean_tiles: state.ocean_tiles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(shipActions, dispatch)
  }
}

OceanTileButtons.propTypes = {
  addShip: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(OceanTileButtons);



// export default OceanTileButtons;
