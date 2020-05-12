 import React from 'react'
 import styled from 'styled-components'
 import Header from '../components/Header'
 import Profile from '../components/Profile'
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

export default function Account() {
  const classes = useStyles();
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={4}
            height={20}
          >
            <Profile />
          </Grid>
          <Grid
            item
            xs={8}
            height={20}
          >
            <div>
              Stats
            </div>
          </Grid>

          <Grid
            container
            spacing={3}
            xs={12}
            height={80}>
              <div>
                Playlists
              </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}