import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import injectStyle from 'react-jss';
import Colours from '../../resources/Colours';
import logo_white from '../../resources/logo_white.png'

const Header = (props) => {
  const { classes } = props;
  return (
    <Navbar expand='lg' variant='dark' className={classes.navBarCustom} >
      <Navbar.Toggle aria-controls='basic-navbar' />
      <Fade left>
        <Navbar.Brand href='#home'>
          <div className={classes.appLogo}>
            <img
              src={logo_white}
              //  width="90"
              //  height="30"
              className={classes.appLogo}
              alt="ASCII Love logo"
            />
          </div>
        </Navbar.Brand>
      </Fade>
      <Fade left>
        <Navbar.Collapse id='basic-navbar' className={classes.appHeader}>

          <Nav defaultActiveKey='#shop' className={classes.appNavBar}>
            <Nav.Item as='li'>
              <Nav.Link eventKey='#home' className={classes.navText} href="#home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link eventKey='#about' to='about' className={classes.navText} href="#about">About Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='#shop' to='shop' className={classes.navText} href="#shop">Shop</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='contact_form' to='contact_form' className={classes.navText} href="#contact_form">Contacto</Nav.Link>
            </Nav.Item>
          </Nav>
          {/* </Fade> */}
        </Navbar.Collapse>
      </Fade>
    </Navbar>
  )
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
  appHeader: {
    animation: 'fadeIn 3s',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-end',
    '@media screen and (max-width: 768px)': {
      display: 'flex',
      flexFlow: 'column',
    },
  },
  appLogo: {
    display: 'flex',
    height: '7vh!important',
    verticalAlign: 'top',
  },
  appNavBar: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0',
    listStyle: 'none',
    position: 'relative',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifycontent: 'flex-end',
    padding: '.5rem 1rem',
    verticalAlign: 'bottom',
  },
  iconStyle: {
    color: 'black',
    margin: '0 15px',
  },
  iconContainer: {
    color: 'white',
    margin: '5px',
  },
  brandLogo: {
    fontSize: '80px',
  },
  navBarCustom: {
    backgroundColor: Colours.primary,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    marginBottom: '1px',
    padding: '1vh 10vw',
  },
  navText: {
    fontSize: '1.5em',
    transition: 'all 0.4s ease',
  },
  navTextSelected: {
    color: 'white'
  },
}


export default injectStyle(styles)(Header);