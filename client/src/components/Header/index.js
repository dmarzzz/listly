import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, Toolbar, Hidden, Box, AppBar } from '@material-ui/core'
import Account from '../../components/Account'

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 1300,
      backgroundColor: '#282C34'
  },
  toolbar: {
    minHeight: 64
  }
}));

function Header({
  className,
}) {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden mdDown>
        <img
        alt="Logo"
        src="/static/logo4.png"
        height="42"
        width="42"
      />
         <h3 id="title">Li$tly </h3>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
