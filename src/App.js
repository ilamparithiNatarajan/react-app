import React, { Component } from 'react';
import './App.css';
import Buttons from './Buttons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Array(9).fill(null),
      xIsNext: true,
    }
  }
  handleClick(i) {
    const copyValues = this.state.values.slice();
    if(copyValues[i] !== null){
      return;
    }
    copyValues[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      values: copyValues,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderButton(i) {
    return (
    <Buttons value={this.state.values[i]} onClick = {() => this.handleClick(i)}></Buttons>
    )
  }
  render() {
    const xNumber = this.state.values.filter( value => value === 'X' );
    const oNumber = this.state.values.filter( value => value === 'O' );
    const status = this.state.values.includes(null) ? 
    'Next player: ' + (this.state.xIsNext ? 'X' : 'O') :
    xNumber.length > oNumber.length ? 
    `Winner: X with ${xNumber.length} votes` : 
    `Winner: O with ${oNumber.length} votes`;
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://github.com/ilamparithiNatarajan/react-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React with {this.props.value}
          </a>
          <br/>
          <br/>
          <br/>
          <div className="status">{status}</div>
          <br/>
          <br/>
          <br/>
          <div className="Buttons">
          {this.renderButton(0)}
          {this.renderButton(1)}
          {this.renderButton(2)}
          <br/>
          {this.renderButton(3)}
          {this.renderButton(4)}
          {this.renderButton(5)}
          <br/>
          {this.renderButton(6)}
          {this.renderButton(7)}
          {this.renderButton(8)}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
