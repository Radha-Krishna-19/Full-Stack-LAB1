import React, { Component } from 'react';
import './ClassExample.css';

class ClassExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: '',
      message: 'Hello from Class Component!'
    };
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ message: `Hello ${this.state.name || 'World'}! Count: ${this.state.count}` });
  };

  render() {
    return (
      <div className="class-example">
        <h2>📚 Class Component Example</h2>
        <p>This demonstrates a React Class Component with state and lifecycle methods.</p>

        <div className="counter-section">
          <h3>Counter (State Management)</h3>
          <p>Count: {this.state.count}</p>
          <button onClick={this.handleIncrement}>+ Increment</button>
          <button onClick={this.handleDecrement}>- Decrement</button>
        </div>

        <form onSubmit={this.handleSubmit} className="form-section">
          <h3>Form Example (Events & Forms)</h3>
          <label>
            Enter your name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Type your name"
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        <div className="message-display">
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default ClassExample;