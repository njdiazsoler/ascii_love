import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Image } from 'react-bootstrap';
import ProductList from './admin/components/ProductList';
import injectSyle from 'react-jss';
import { Fade } from 'react-reveal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      curPage: 0,
      data: [],
      noMoreData: false,
    }
  }


  componentDidMount = async () => {
    try {
      let data = [];
      let nextData = [];
      let curData = await fetch(`http://localhost:3000/api/products?_page=${this.state.curPage}&_limit=20`)
        .then(response => response.json())
        .then(nextData = await this.getNextPageData(this.state.curPage + 1));
      data.push(curData)
      this.setState({ data: data, nextData: nextData, isLoading: false });
      window.addEventListener('scroll', this.onScroll, false);
    } catch (error) {
      throw console.log(`error is ${error}`)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  // Get Next Page Data Method: fetches following data, using limit of 20.

  getNextPageData = (page) => {
    // let nextPage = this.state.curPage + 1;
    let nextPageData = fetch(`http://localhost:3000/api/products?_page=${page}&_limit=20`)
      .then(response => response.json());
    return nextPageData;
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1)) {
      let { data } = this.state;
      data.push(this.state.nextData);
      this.setState({ data: data });
      this.showData();
    }
  }

  showData = () => {
    let { data } = this.state;
    for (let i = 0; i <= data.length; i++) {
      return (
        <Fade key={`fade.${i}`} when={!this.state.isLoading} appear={!this.state.isLoading}>
          <ProductList key={`list.${i}`} data={data[i]} />
          <Image key={`img.${i}`} src='../../resources/200.jpg' />
        </Fade>
      )
    }
  }

  showNextPage = () => {
    return (
      <ProductList data={this.state.nextPageData} />
    )
  }



  render() {
    const nextPageButton = {
      padding: '2vh 1vw',
      textAlign: 'center',
    }
    return (
      <div>
        {this.state.isLoading ?
          <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...' style={{ maxWidth: '50vw', maxHeight: '50vh' }}></img>
          :
          this.showData()
        }
        <div style={nextPageButton}>
          <Button
            onClick={this.showNextPage}
          >Next Page
        </Button>
        </div>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));