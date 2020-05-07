import React, { useRef, useState} from 'react';
import { makeStyles, Typography, MenuItem, Menu, Hidden, ButtonBase, Box, Avatar} from '@material-ui/core';
import { UserConsumer } from '../../contexts/UserContext';

const account = {
  user: {
      id: '73',
      avatar: '/static/avatar_8.png',
    }
  }

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 36,
    width: 36,
    marginRight: theme.spacing(1)
  },
  dropdown: {
    width: 100
  }
}));

function Account() {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <UserConsumer>
    {({ user, onLogout }) => (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar
          alt="D"
          className={classes.avatar}
          src={account.user.avatar}
        />
        <Hidden smDown>
          <Typography
            variant="h6"
            color="inherit"
          >
            {`${user}`}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.dropdown }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem
        >
          Profile
        </MenuItem>
        <MenuItem
        >
          Account
        </MenuItem>
        <MenuItem onClick={onLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
    )}
    </UserConsumer>
  );
}

export default Account;