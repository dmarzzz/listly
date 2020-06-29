 import React from 'react'
 import styled from 'styled-components'
 import Header from '../components/Header'
 import Profile from '../components/Profile'
 import ProfileStats from '../components/ProfileStats'
 import ProfileTabs from '../components/ProfileTabs'
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
    flexGrow: 1,
    padding: '5%',
    minHeight: '92%'
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

      <div
        className={classes.container}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={4}
          >
            <Profile />
          </Grid>
          <Grid
            item
            xs={8}
          >
            <ProfileStats />
          </Grid>

          <Grid
            container item
            spacing={3}
            xs={12}
            height={200}>
              <ProfileTabs />
          </Grid>
        </Grid>
      </div>
      
    </>
  )
}