import React, { Component } from 'react';
import './App.css';
import PollingStream from './PollingStream'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button id="start" onClick={() => this.stream.start()}>start</button>
          <button id="start" onClick={() => this.stream.stop()}>stop</button>
          <PollingStream
            interval={1000}
            ref={(stream) => this.stream = stream}
            route='https://blockchain.info/ticker'>
            {response =>
              Object.keys(response)
                .map((symbol) => <p key={symbol}>{symbol} - {response[symbol].last}</p>)
            }
          </PollingStream>
        </header>
      </div>
    );
  }
}

export default App;
