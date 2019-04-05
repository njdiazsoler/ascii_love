import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import injectStyle from 'react-jss';
import { Fade } from 'react-reveal';
import Colours from '../client/resources/Colours'
import ProductList from './admin/components/ProductList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentDidMount = () => {

  }

  // Reorder item list

  reorderList = async (e) => {
    console.log('reorderingList...');
    let nextData = [];
    let newData = await fetch(`http://localhost:3000/api/products?_page=0&_limit=20`)
      .then(response => response.json())
      .then(nextData = await this.getNextPageData(this.state.curPage + 1, e.target.id))
      this.setState({ data: newData, nextData: nextData, isLoading: false, curPage: this.state.curPage++  });
      console.log(this.state.data, nextData)
  }

  // Removing event listener for scrolling.

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  // check if this.state.data is not empty and update parent state accordingly.

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Container>
          <header>
            <h1 className={classes.header}>Products Grid</h1>

            <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our
          selection of ascii faces in an exciting range of sizes and prices.</p>

            {/* <p>But first, a word from our sponsors:</p>
          <script>document.write('<img className="ad" src="/ads/?r=' + Math.floor(Math.random() * 1000) + '" />');</script> */}
          </header>

          <section className="products">
            {/* <p>... products go here ...</p> */}
              <Fade when={!this.state.isLoading} appear={!this.state.isLoading}>
                <ProductList isDataReady={this.isDataReady} />
              </Fade>
          </section>
        </Container>
      </div>
    )
  }
}

const styles = {
  header: {

  },
  mainContainer: {
    backgroundColor: Colours.tertiary,
    fontFamily: 'Hind Siliguri, sans-serif',
    minHeight: '100vh',
  }
}

const StyledApp = injectStyle(styles)(App);

ReactDOM.render(<StyledApp />, document.getElementById('root'));