import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch}  from '@fortawesome/free-solid-svg-icons';
import injectStyle from 'react-jss';
import Colours from '../../resources/Colours';
import logo_white from '../../resources/logo_white.png';

/* TODOs! 
- Add cart functionality.
- Add search functionality.
*/

const Header = (props) => {
  const { classes } = props;
  return (
    <Navbar expand='lg' variant='dark' className={classes.navBarCustom} >
      <Navbar.Toggle aria-controls='basic-navbar' />
    <Navbar.Brand href='#home'>
            <img
              src={logo_white}
              className={classes.appLogo}
              alt="ASCII Love logo"
            />
        </Navbar.Brand>
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
            {/* NavLinks used as placeholders for icon functionality */}
            <Nav.Item>
              <Nav.Link className={classes.navText} href="#cart">
              <FontAwesomeIcon size='lg'  icon={faShoppingCart} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={classes.navText} href="#search">
              <FontAwesomeIcon size='lg' icon={faSearch} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

const styles = {
  '@keyframes fadeIn': {
    from: {
      left: '-10%',
      opacity: '0',
    },
    to: {
      left:'0%',  
      opacity: '1',
    },
  },
  appHeader: {
    animation: 'fadeIn 3s',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-end',
    left: '-10%',
    '@media screen and (max-width: 768px)': {
      display: 'flex',
      flexFlow: 'column',
    },
  },
  appLogo: {
    animation: 'fadeIn 3s',
    display: 'flex',
    height: '7vh!important',
    left: '-20%',
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