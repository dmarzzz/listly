import React from 'react'
import styled from 'styled-components'
import { makeStyles, Card, Container, CardContent, Typography
  , Grid, TableBody, TableCell, TableContainer, TableHead
  , TableRow } from '@material-ui/core'
import useAxios from 'axios-hooks';
import { Autorenew } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#282C34',
    color: 'white',
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      alignItems: 'stretch'
    }
  },
  stat: {
    textAlign: 'center',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

export default function ProfileStats() {
  const classes = useStyles()

  return (
    <Card
      className={classes.root}
    >
      <Grid
        container
        spacing={4}
      >
        <Grid item
          xs={4}
        >
          <div className={classes.stat}>
            <Typography variant="h5">
              Followers
            </Typography>
            <Typography>
              23
            </Typography>
          </div>
        </Grid>

        <Grid item 
          xs={4}
        >
          <div className={classes.stat}>
          <Typography variant="h5">
              Playlists
            </Typography>
            <Typography>
              23
            </Typography>
          </div>
        </Grid>

        <Grid item
          xs={4}
        >
          <div className={classes.stat}>
          <Typography variant="h5">
              Liked Playlists
            </Typography>
            <Typography>
              23
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}