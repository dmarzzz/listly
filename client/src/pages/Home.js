import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import PlaylistFeed from '../../src/components/PlaylistFeed' //not sure why importing this like the comp below doesnt work
import FriendPlaylistFeed from '../components/FriendFeed'
import Playlist from '../components/Playlist'
import {
  Grid,
  Container,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64,
      marginTop: '8%',
    }
  }
}));


const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

//TO-DO: Move all this to a homepage component

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      /* <Container
        maxWidth={false}
        className={classes.container}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={5}
            xl={4}
            xs={12}
          >
            <PlaylistFeed />
          </Grid>
          <Grid
            item
            lg={7}
            xl={8}
            xs={12}
          >
            <FriendPlaylistFeed />
          </Grid>
        </Grid>
      </Container> 
    </>
  )
}