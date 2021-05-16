import React from 'react';
import { AppBar, Button, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import HomePageActions from '../HomePageActions/HomePageActions';
import styles from './styles';

const useStyles = makeStyles(styles);

const Header = () => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

  return (
    <AppBar className={classes.appBar}>
      <Button href="/" className={classes.title}>
        <img
          alt="SEANCE"
          src={require(`images/seance/logo-mascot-name.svg`)}
          height={isSmallScreen ? 100 : 250}
        />
      </Button>

      <HomePageActions />
    </AppBar>
  );
};

export default Header;
