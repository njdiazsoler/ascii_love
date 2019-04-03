import React, { Component, Fragment } from 'react';
import injectStyle from 'react-jss';
import { Col, Container, Card, Image, ListGroup, ListGroupItem, CardDeck } from 'react-bootstrap';
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
    console.log(this.props.data)
    const { classes } = this.props;
    return (
      <Container>
        
        <CardDeck>
          {this.props.data ?
            this.props.data.map((item, index) => {
              if ((index + 2) % 20 !== 1) {
                return (
                  <Col key={`col${item.id}`} md={3} className={classes.itemCard}>
                    <Card key={`card${item.id}`}>
                      <Card.Body className={classes.itemFace} style={{ fontSize: item.size }} key={`body${item.id}`}>
                        {item.face}
                      </Card.Body>
                      <ListGroup>
                        <ListGroupItem>Price: {Utils.formatPrice(item.price)}</ListGroupItem>
                        <ListGroupItem className={classes.listDate}>Date: {Utils.formatDate(item.date)}</ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                )
              }
              return (
                <Fragment>
                  <Col key={`col${item.id}`} md={3} className={classes.itemCard}>
                    <Card key={`card${item.id}`}>
                      <Card.Body className={classes.itemFace} style={{ fontSize: item.size }} key={`body${item.id}`}>
                        {item.face}
                      </Card.Body>
                      <ListGroup>
                        <ListGroupItem>Price: {Utils.formatPrice(item.price)}</ListGroupItem>
                        <ListGroupItem className={classes.listDate}>Date: {Utils.formatDate(item.date)}</ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col key={`imgcol${item.id}`} md={12} className={classes.imageStyle} >
                    <Image key={`img${item.id}`} src={`/ads/?r=${Math.floor(Math.random() * 1000)}`} 
                     />
                  </Col>
                </Fragment>
              )
            })
            :
            <div></div>
          }
        </CardDeck>
      </Container>

    )
  }

}

const styles = {
  imageStyle: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
  },
  itemCard: {
    margin: '1vh 0',
    textAlign: 'center',
    padding: '1vh 0'
  },
  itemFace: {
    // textAlign: 'center',
    minHeight: '15vh',
  },
  listDate: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '15vh',
  },
  productList: {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
  }
};

export default injectStyle(styles)(ProductList);