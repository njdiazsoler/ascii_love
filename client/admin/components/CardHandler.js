import React, { Fragment } from 'react';
import { Card, CardDeck, Col, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import injectStyle from 'react-jss';
import Utils from '../../resources/Utils.js';

const CardHandler = (props) => {
  const { classes } = props
  return (
    <CardDeck>
      {props.data ?
        props.data.map((item, index) => {
          if ((index + 2) % 20 !== 1) {
            console.log(`col${index}`);
            return (
              <Col key={`col${index}`} xs={4} lg={3} className={classes.itemCard}>
                <Card key={`card${index}`}>
                  <Card.Body className={classes.itemFace} style={{ fontSize: item.size }} key={`body${index}`}>
                    {item.face}
                  </Card.Body>
                  <ListGroup key={`group${index}`}>
                    <ListGroupItem key={`price${index}`}>Price: {Utils.formatPrice(item.price)}</ListGroupItem>
                    <ListGroupItem key={`date${index}`} className={classes.listDate}>Date: {Utils.formatDate(item.date)}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            )
          }
          return (
            <Fragment key={`fragment${index}`}>
              <Col key={`col${index}`} xs={4} lg={3} className={classes.itemCard}>
                <Card key={`card${index}`}>
                  <Card.Body className={classes.itemFace} style={{ fontSize: item.size }} key={`body${index}`}>
                    {item.face}
                  </Card.Body>
                  <ListGroup key={`group${index}`}>
                    <ListGroupItem key={`price${index}`}>Price: {Utils.formatPrice(item.price)}</ListGroupItem>
                    <ListGroupItem key={`date${index}`} className={classes.listDate}>Date: {Utils.formatDate(item.date)}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
              <Col key={`imgcol${index}`} md={12} className={classes.imageStyle} >
                <Image key={`img${index}`} src={`/ads/?r=${Math.floor(Math.random() * 1000)}`}
                />
              </Col>
            </Fragment>
          )
        })
        :
        null
      }
    </CardDeck>
  )
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
  },
}

export default injectStyle(styles)(CardHandler);