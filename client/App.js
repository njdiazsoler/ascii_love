import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container } from 'react-bootstrap';
import ProductList from './admin/components/ProductList';
import injectSyle from 'react-jss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      curPage: 1,
      curPageData: '',
      nextPageData: '',
    }
  }


  componentDidMount = async () => {
    try {
      let nextData = [];
      let curData = await fetch(`http://localhost:3000/api/products?_page=${this.state.curPage}&_limit=20`)
        .then(response => response.json())
        .then(nextData = await this.getNextPageData());
      this.setState({ curPageData: curData, nextPageData: nextData, isLoading: false });
      window.addEventListener('scroll', this.onScroll, false);
    } catch (error) {
      throw console.log(`error is ${error}`)
    }
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll, false);
  }

  // Get Next Page Data Method: fetches following data, using limit of 20.

  getNextPageData = () => {
    let nextPage = this.state.curPage + 1;
    let nextPageData = fetch(`http://localhost:3000/api/products?_page=${nextPage}&_limit=20`)
      .then(response => response.json());
    return nextPageData;
  }

  onScroll = () => {
    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-1)){
      console.log('final de la página');
    }
  }

  showNextPage = () => {
    return (
      <ProductList data={this.state.nextPageData}/>
    )
  }

  render() {

    const nextPageButton = {
        padding: '2vh 1vw',
        textAlign: 'center',
      }
    
    console.log(this.state)
    return (
      <div>
        {this.state.curPageData === '' ?
          <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...' style={{ maxWidth: '50vw', maxHeight: '50vh' }}></img>
          : <ProductList data={this.state.curPageData} />
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