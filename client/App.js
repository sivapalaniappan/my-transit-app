import React, { Component } from 'react';
import './app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      route: '',
      stop: '',
      direction: '',
      response: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var { route='', stop='', direction='' } = this.state;
    fetch('/api/getNextBusTime?route='+route+'&stop='+stop+'&direction='+direction, {
      method: 'GET'
    }).then(results => results.json()).then(data => this.setState({response: data }));
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="route">Enter Route Description</label>
          <input id="route" name="route" type="text"
          value={this.state.route}
          onChange={this.handleInputChange} />

          <label htmlFor="stop">Enter Stop Description</label>
          <input id="stop" name="stop" type="text"
          value={this.state.stop}
          onChange={this.handleInputChange} />

          <label htmlFor="direction">Enter Direction</label>
          <input id="direction" name="direction" type="text"
          value={this.state.direction}
          onChange={this.handleInputChange} />

          <button>Get Next Trip Departure Time</button>
        </form>
        <div className="response">
          <h3 className={this.state.response ? '' : 'hidden'}>{this.state.response}</h3>
        </div>
      </div>
    );
  }

}

export default App;
