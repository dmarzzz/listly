import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Card, Grid, CardContent, Typography
  , Table, TableBody, TableCell, TableContainer, TableHead
  , TableRow, Paper } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PlaylistListItem from './PlaylistListItem';
import UserListItem from './UserListItem';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#282C34',
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  panel: {
    height: '100%',
    width: '100%',
    overflowY: 'auto'
  }
}));

function getPlaylists(playlistJSON) {
  const classes = useStyles;
  const list = playlistJSON.data.map((playlist) =>
      <PlaylistListItem playlist={playlist}/> 
      )
  return(
    <div className={classes.root}>
      <Grid container spacing={3} justify="flex-start">
        {list}
      </Grid>
    </div>
  )
}

function getFollowed() {
  const classes = useStyles;
  const a = [...Array(20).keys()]
  const users = a.map((num) =>
    <UserListItem />
  )
  return( 
    <div className={classes.root}>
      <Grid container spacing={3} justify="flex-start">
        {users}
      </Grid>
    </div>
  )
}

export default function ProfileTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [playlists, setPlaylists] = useState({data : []});

  useEffect( () => {
    const fetchPlaylists = async () => {
      const result = await axios(
        'http://localhost:7373/api/playlists'
      );
      setPlaylists(result);
    };

    fetchPlaylists();
  }, []);

  console.log("playlists are :", playlists)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        area-label="Profile Tabs"
        className={classes.tabs}
      >

        <Tab label="User Playlists" {...a11yProps(0)} />
        <Tab label="Followed Playlists" {...a11yProps(0)} />
        <Tab label="Followed Users" {...a11yProps(0)} />

      </Tabs>
      <div className={classes.panel}>
        <TabPanel value={value} index={0}>
          {getPlaylists(playlists)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {getPlaylists(playlists)}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {getFollowed()}
        </TabPanel>
      </div>
    </Box>
  )
}