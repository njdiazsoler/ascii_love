import React, { Component, Fragment } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import injectStyle from 'react-jss';
import { Fade } from 'react-reveal';
import Colours from '../../resources/Colours.js';
import CardHandler from './CardHandler';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      curPage: 1,
      isLoading: true,
      moreToLoad: true,
      dataLoaded: false,
    };
  }

  // This component receives data from its parent and maps it into cards. Every 20 cards, there's an ad
  // displayed individually in a row

  // Fetching first and second batch of data on Mount, pushing first page data to this.state.data 
  // and second page data to this.state.nextData. Adding event listener to detect scrolling.

  componentDidMount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products?_page=${this.state.curPage}&_limit=20`)
      const body = await response.json();
      // Blocking loop on purpose?
      const nextData = await this.getNextPageData(this.state.curPage + 1);
      this.setState({ data: body, nextData: nextData, isLoading: false, dataLoaded: true, curPage: this.state.curPage + 1 });
      window.addEventListener('scroll', this.onScroll, false);
    } catch (error) {
      throw console.log(`error is ${error}`);
    }
  }

  // Get Next Page Data Method: fetches following data, using limit of 20.

  getNextPageData = async (page, orderBy) => {
    console.log(page);
    if (!orderBy) {
      const response = await fetch(`http://localhost:3000/api/products?_page=${page}&_limit=20`);
      const body = await response.json();
      console.log(body);
      return body;
    }
    let response = await fetch(`http://localhost:3000/api/products?_page=${page}&_limit=20&_sort=${orderBy}`)
    const body = await response.json();
    return body;
  }

  // onScroll Function to specify what happens when reaching the end of the page

  onScroll = async () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1) && this.state.dataLoaded) {
      this.setState({ dataLoaded: false });
      let { nextData, data, curPage } = this.state;
      nextData.forEach(item => {
        data.push(item);
      });
      const newData = await this.getNextPageData(curPage+1);
      this.setState({ data: data, nextData: newData, curPage: curPage+1, dataLoaded: true });
    }
  }

  /* TODOs:
  - Dropdown animation when clicking dropdown.
  - Fade animation when revealing new data.

  */

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.productSection}>
        <Dropdown drop='right'>
          <Dropdown.Toggle variant='light' id='dropdown-basic' className={classes.dropdownButton}>
            Order by
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.props.onClick} id='id'>ID</Dropdown.Item>
            <Dropdown.Item onClick={this.props.onClick} id='price'>Price</Dropdown.Item>
            <Dropdown.Item onClick={this.props.onClick} id='size'>Size</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Container className={classes.productContainer}>
          {this.state.isLoading ?
            <Fragment>
              <Fade>
                <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='loading...' className={classes.appSpinner}/>
              </Fade>
            </Fragment>:
              <Fade>
                <CardHandler data={this.state.data} />
              </Fade>
          }
          {this.state.moreToLoad && !this.state.isLoading ?
              <Fade>
                <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='loading...' className={classes.appSpinner}/>
              </Fade>
            :
            this.state.isLoading ?
              null :
              <Fade left>
                <p>End of catalogue! (ಥ_ಥ)</p>
              </Fade>
          }
        </Container>
      </Container>

    )
  }

}

const styles = {
  appSpinner: {
    maxWidth: '30vw',
    maxHeight: '50vh'
  },
  dropdownButton: {
    backgroundColor: Colours.tertiary,
  },
  productContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  productSection: {
    display: 'flex',
    flexFlow: 'column',
  },

};

export default injectStyle(styles)(ProductList);