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
    borderRadius: '50%'
  },
  circle: {
    width: '100%',
    height: 'auto',
    marginTop: '-50%'
  },
  button: {
    color: 'white',
    border: '0.5px solid #FFFFFF'
  },
  table: {
    minWidth: 550,
  },
  hoverEffect: {
    '& tbody>.MuiTableRow-root:hover': {
      color: 'white',
      background: 'rgba(220, 107, 229, 0.2)', //https://stackoverflow.com/questions/5662178/opacity-of-divs-background-without-affecting-contained-element-in-ie-8
    }
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
    </Card>
  )
}