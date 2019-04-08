import React, { Fragment, useState } from 'react';
import { Card, CardDeck, Col, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { Fade } from 'react-reveal';
import injectStyle from 'react-jss';
import Utils from '../../resources/Utils.js';

const CardHandler = (props) => {
  const { classes } = props

  return (
    <CardDeck style={{ alignItems: 'center', justifyContent: 'center'}}>
      {props.data ?
        props.data.map((item, index) => {
          let colSize = 3;
          if ((index + 2) % 20 !== 1) {
            if(item.size >= 35 && item.face.length >=10){
              colSize = 5;
            } else if (item.size < 18 && item.face.length < 10 && Utils.formatDate(item.date).length < 12){
              colSize = 2
            }
            return (
              <Col key={`col${index}`} xs='auto' lg={colSize} className={classes.itemCard}>
                <Card key={`card${index}`}>
                  <Card.Body className={classes.itemFace} style={{ fontSize: item.size }} key={`body${index}`}>
                    {item.face}
                  </Card.Body>
                  <ListGroup variant='flush' key={`group${index}`}>
                    <ListGroupItem key={`size${index}`}>Size: {item.size}</ListGroupItem>
                    <ListGroupItem key={`price${index}`}>Price: {Utils.formatPrice(item.price)}</ListGroupItem>
                    <ListGroupItem key={`date${index}`} className={classes.listDate}>Date: {Utils.formatDate(item.date)}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            )
          }
          return (
            <Fragment key={`fragment${index}`}>
              <Col key={`col${index}`} xs='auto' lg={3} className={classes.itemCard}>
                <Card key={`card${index}`}>
                  <Card.Body className={classes.itemFace} style={{ fontSize: item.size }} key={`body${index}`}>
                    {item.face}
                  </Card.Body>
                  <ListGroup variant='flush' key={`group${index}`}>
                    <ListGroupItem key={`size${index}`}>Size: {item.size}</ListGroupItem>
                    <ListGroupItem key={`price${index}`}>Price: {Utils.formatPrice(item.price)}</ListGroupItem>
                    <ListGroupItem key={`date${index}`} className={classes.listDate}>Date: {Utils.formatDate(item.date)}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
              <Col key={`imgcol${index}`} md={12} className={classes.imageStyle} >
              <Fade left>
                <img key={`img${index}`} src={Utils.getAdUrl()}
                  />
                </Fade>
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
  cardDeck: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageStyle: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    padding: '3vh 0'
  },
  itemCard: {
    backgroundColor: 'transparent',
    margin: '1vh 0',
    padding: '1vh 0',
    textAlign: 'center',
  },
  itemFace: {
    // textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '15vh',
  },
  listDate: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '15vh',
  },
  listGroup: {
    display: 'flex',
    flexFlow: 'column',
  },
  productList: {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
  },
}

export default injectStyle(styles)(CardHandler);