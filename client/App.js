import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import ProductList from './admin/components/ProductList';
import { Fade } from 'react-reveal';
import Colours from './resources/Colours';
import injectStyle from 'react-jss';

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
      this.setState({ data: curData, nextData: nextData, isLoading: false });
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
      let { nextData, data } = this.state;
      nextData.forEach(item => {
        data.push(item);
      })
      this.setState({ data: data });
      // this.showData();
    }
  }


  render() {
    const { classes } = this.props
    return (
      <Container className={classes.mainContainer}>
        <header>
          <h1 className={classes.header}>Products Grid</h1>

          <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our
          selection of ascii faces in an exciting range of sizes and prices.</p>

          <p>But first, a word from our sponsors:</p>
          <script>document.write('<img className="ad" src="/ads/?r=' + Math.floor(Math.random() * 1000) + '" />');</script>
        </header>

        <section className="products">
          <p>
            ... products go here ...
          </p>
          {this.state.isLoading ?
            <img src='https://upload.wikimedia.org/wikipedia/commons/6/66/Loadingsome.gif' alt='loading...' style={{ maxWidth: '50vw', maxHeight: '50vh' }}></img>
            :
            <Fade when={!this.state.isLoading} appear={!this.state.isLoading}>
              <ProductList data={this.state.data} />
            </Fade>
          }
        </section>
      </Container>
    )
  }
}

const styles = {
  header: {
    fontFamily: 'Sansita, sans-serif',
  },
  mainContainer: {
    backgroundColor: Colours.tertiary,
    fontFamily: 'Hind Siliguri, sans-serif',
    fontFamily: 'Martel, serif'
  }
}

const StyledApp = injectStyle(styles)(App);

ReactDOM.render(<StyledApp />, document.getElementById('root'));