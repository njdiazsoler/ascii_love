import React, { Component } from 'react';
import injectStyle from 'react-jss';
import { Col, Container, Card, ListGroup, ListGroupItem, Row, CardDeck } from 'react-bootstrap';
const Utils = require('../../resources/Utils.js')

class ProductList extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data || null;
    this.state = {
      data: data,
    };
  }



  render() {
    const { classes } = this.props;
    return (
      <Container>
        <CardDeck>
          {/* <Container className={classes.productList}> */}
          {this.props.data ?
            this.props.data.map(item => {
              return (
                <Col key={item.id} md={3} className={classes.itemCard}>
                  <Card key={item.id}>
                    <Card.Body className={classes.itemFace} style={{ fontSize: item.size }} key={item.id}>
                      {item.face}
                    </Card.Body>
                    <ListGroup>
                      <ListGroupItem>Price: {Utils.formatPrice(item.price)}</ListGroupItem>
                      <ListGroupItem className={classes.listDate}>Date: {Utils.formatDate(item.date)}</ListGroupItem>
                    </ListGroup>
                  </Card>
                </Col>
              )
            }) :
            <div></div>
          }
          {/* </Container> */}
        </CardDeck>
      </Container>

    )
  }

}

const styles = {
  itemCard: {
    margin: '1vh 0',
    textAlign: 'center',
  },
  itemFace: {
    // textAlign: 'center',
    minHeight: '15vh',
  },
  listDate: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '20vh',
  },
  productList: {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
  }
};

export default injectStyle(styles)(ProductList);