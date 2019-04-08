import React, { Component } from 'react';
import { Container, Image } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import injectStyle from 'react-jss';
import { Fade } from 'react-reveal';
import Header from './admin/components/Header';
import ProductList from './admin/components/ProductList';
import Utils from '../client/resources/Utils'

// Parent app.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedImage: false,
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainWrapper}>
        <header>
          <Header />
        </header>
        <Container className={classes.appBody}>
          <Fade>
            <h1 className={classes.header}>Products Grid</h1>

            <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our
          selection of ascii faces in an exciting range of sizes and prices.</p>

            <p>But first, a word from our sponsors:</p>
            <Container className={classes.firstAd}>
                <img 
                className={classes.imageAd}
                src={Utils.getAdUrl()} />
            </Container>

          </Fade>
          <section>
            <Fade delay={500}>
              <ProductList />
            </Fade>
          </section>
        </Container>
      </div>
    )
  }
}

const styles = {
  '@keyframes fadeIn': {
    from: {
      opacity: '0',
    },
    to: {
      opacity: '1',
    },
  },
  appBody: {
    marginTop: '10vh',
  },
  firstAd: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2vh',
    padding: '3vh 0',
  },
  imageAd: {
    animation: 'fadeIn 10s',
    opacity: '1',
  },
  mainWrapper: {
    // backgroundColor: Colours.tertiary,
    fontFamily: 'Hind Siliguri, sans-serif',
    minHeight: '100vh',
  }
}

const StyledApp = injectStyle(styles)(App);

ReactDOM.render(<StyledApp />, document.getElementById('root'));