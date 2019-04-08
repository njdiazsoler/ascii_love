import React from 'react';
import injectStyle from 'react-jss';

const Spinner = (props) => {
  const { classes } = props;
  return (
    <div className={classes.appSpinner}>

    </div>
  )
}

const styles = {
  appSpinner: {
    animation: 'onflow-spin 2s linear infinite',
    border: '4px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '4px solid #47494c',
    height: '10vh',
    margin: '2vh 2vw',
    width: '10vh',
  },
  '@keyframes onflow-spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    }
  }
}

export default injectStyle(styles)(Spinner);