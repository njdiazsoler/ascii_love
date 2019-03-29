import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <p>Website is online</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));