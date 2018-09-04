import React from 'react';

class DirectionToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ship_direction: props.ship_direction,
    };
  }

  handleDirectionChange() {
    var direction = this.state.ship_direction === 'horizontal' ? 'vertical' : 'horizontal';
    this.setState({
      ship_direction: direction,
    })
  }

  render() {
    return (
      <button onClick={() => {this.handleDirectionChange();}}>Toggle Direction</button>
    )
  }
}

export default DirectionToggle;
