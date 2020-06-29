import React from 'react'
import { makeStyles, Card, CardHeader, CardContent, Typography
  , Table, TableBody, TableCell, TableContainer, TableHead
  , TableRow } from '@material-ui/core'
import useAxios from 'axios-hooks';
import { Autorenew } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    background: '#282C34',
    color: 'white',
  },
  imageCropper: {
    display: 'inline-block',
    position: 'relative',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    borderRadius: '50%',
    float: 'left'
  },
  circle: {
    width: '100%',
    height: 'auto',
    marginTop: '-50%'
  },
  profileDetails: {
    float: 'right',
    margin: '5px'
  }
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <Card classes={{
      root: classes.root
    }}>
      <div className={classes.imageCropper}>
        <img src='https://i.scdn.co/image/ab6775700000ee850e5a04f34543eb4318964837' className={classes.circle} />
      </div>
      <div className={classes.profileDetails}>
        <div>Carson Brown</div>
        <div>carsonbrown67@gmail.com</div>
      </div>
    </Card>
  )
}