import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      curPage: 1,
      data: '',
      nextPage: ''
    }
  }

  componentDidMount = async () => {
    try {
      let nextPageData = [];
      let apiData = await fetch(`http://localhost:3000/api/products?_page=${this.state.curPage}&_limit=20`)
      .then(response => response.json())
      .then(nextPageData = await this.getNextPageData());
      this.setState({data: apiData, nextPage: nextPageData, isLoading: false} );
    } catch (error) {
      throw console.log(`error is ${error}`)
    }
  }

  // Get Next Page Data Method: fetches following data, using limit of 20.

  getNextPageData = () => {
    let nextPage = this.state.curPage + 1;
    let nextPageData = fetch(`http://localhost:3000/api/products?_page=${nextPage}&_limit=20`)
    .then(response => response.json());
    console.log(nextPageData);
    return nextPageData;
  }

  render() {
    console.log(this.state.data, this.state.nextPage)
    return (
      <div>
        <p>Website is online</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));