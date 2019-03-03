import React, { Component } from 'react';

class Buttons extends Component {
    render() {
        return (

            <button className="Buttons" 
          onClick={() =>  this.props.onClick()}
          >
        {this.props.value}
      </button>
        );
    }
}

export default Buttons;