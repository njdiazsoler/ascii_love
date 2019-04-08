import React, { Component, Fragment } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import Colours from '../../resources/Colours';
import injectStyle from 'react-jss';
import CardHandler from './CardHandler';
import Spinner from './Spinner';

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

  /*
  This component receives data from its parent and maps it into cards. Every 20 cards, there's an ad
  displayed individually in a row.

  Fetching first and second batch of data on Mount, pushing first page data to this.state.data 
  and second page data to this.state.nextData, and adding event listener to detect scrolling. 
  
  TODOs:
  - Dropdown animation when clicking dropdown.
  - Fade animation when revealing new data.
  - Fix ad animation: sometimes it doesn't load due to delay in receiving image.
  - Fix infinite scroll delay/flicker: when having more than 100 components in the dome, React may suffer from performance issues.
    This can be solved easily by using libraries such as react-window or react-virtualized, but this assignment prevented me from using them.
  */

  componentDidMount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products?_page=${this.state.curPage}&_limit=20`)
      const body = await response.json();
      const nextData = await this.getNextPageData();
      this.setState({ data: body, nextData: nextData, isLoading: false, dataLoaded: true, curPage: 2 });
      window.addEventListener('scroll', this.onScroll, false);
    } catch (error) {
      throw console.log(`error is ${error}`);
    }
  }

  // Removing event listener for scrolling.

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  // Get Next Page Data Method: fetches following data, using limit of 20.

  getNextPageData = async () => {
    let nextPage = (this.state.curPage + 1)
    if (!this.state.sort) {
      const response = await fetch(`http://localhost:3000/api/products?_page=${nextPage}&_limit=20`);
      const body = await response.json();
      if (body.length === 0) {
        this.setState({ moreToLoad: false });
        return null
      }
      return body;
    }
    let response = await fetch(`http://localhost:3000/api/products?_page=${nextPage}&_limit=20&_sort=${this.state.sort}`)
    const body = await response.json();
    if (body.length === 0) {
      this.setState({ moreToLoad: false });
      return null
    }
    return body;
  }

  // onScroll Function to specify what happens when reaching the end of the page

  onScroll = async () => {
    if (!this.state.endOfPage) {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
        this.setState({ dataLoaded: false, endOfPage: true });
        const { nextData, data, curPage } = this.state;
        nextData.forEach(item => {
          data.push(item);
        });
        const newData = await this.getNextPageData();
        this.setState({ data: data, nextData: newData, curPage: curPage + 1, dataLoaded: true, endOfPage: false });
        return
      }
    }
  }

  // Reorder item list method. Get new sorted data and set sort in the state. getNextPageData method will use it for fetching
  // next page data

  reorderList = async (e) => {
    e.persist();
    const sortBy = e.target.id;
    this.setState({ isLoading: true, dataLoaded: false, curPage: 1, data: [], nextData: [], sort: sortBy })
    const response = await fetch(`http://localhost:3000/api/products?_page=1&_limit=20&_sort=${this.state.sort}`);
    const orderedData = await response.json();
    const nextOrderedData = await this.getNextPageData();
    this.setState({ data: orderedData, nextData: nextOrderedData, isLoading: false, curPage: this.state.curPage + 1, dataLoaded: true });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.productSection}>
        <Container className={classes.productContainer}>
          {this.state.isLoading ?
            <Fragment>
              <Fade>
                <Spinner />
              </Fade>
            </Fragment> :
            <Fade>
              <Dropdown drop='right'>
                <Dropdown.Toggle variant='light' id='dropdown-basic' className={classes.dropdownButton}>
                  Order by
          </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.reorderList} id='id'>ID</Dropdown.Item>
                  <Dropdown.Item onClick={this.reorderList} id='price'>Price</Dropdown.Item>
                  <Dropdown.Item onClick={this.reorderList} id='size'>Size</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <CardHandler data={this.state.data} />
            </Fade>
          }
          {this.state.moreToLoad && !this.state.isLoading ?
            <Spinner />
            :
            this.state.isLoading ?
              null :
              !this.state.moreToLoad ?
                <Fade left>
                  <p>End of catalogue! (ಥ_ಥ)</p>
                </Fade> :
                null
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