import React from 'react'
import clsx from 'clsx'
import { makeStyles, Card, Typography, Grid, CardHeader, CardContent
  , CardMedia, CardActions, Collapse, IconButton, ListItem, ListItemText} from '@material-ui/core'


const useStyles = makeStyles(() => ({
  root: {
    background: '#7d7e80',
    color: 'white',
    //border: '5px solid blue',
  },
  circle: {
    width: '100%',
    height: 'auto'
  },
  imageCropper: {
    display: 'inline-block',
    position: 'relative',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    float: 'left'
  },
  details: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '150px'
  }
})); 

export default function UserListItem() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <Grid item xs={4}>
      <Card className={classes.root} border={1} onClick={handleExpandClick}>
        <div className={classes.details}>
          <CardMedia 
            className={classes.cover}
            image="https://i.scdn.co/image/ab6775700000ee850e5a04f34543eb4318964837"
            title="Carson"
          />
          <CardContent className={classes.content}>
            <Typography component="h5" carient="h5">
              Carson Brown
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Playlists: 23
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Followers: 10000
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Following: 12
            </Typography>

          </CardContent>
        </div>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ol>
              <li>Allstar - Smash Mouth</li>
              <li>Allstar - Smash Mouth</li>
              <li>Allstar - Smash Mouth</li>
              <li>Allstar - Smash Mouth</li>
              <li>Allstar - Smash Mouth</li>
            </ol>
          </CardContent>
        </Collapse>

      </Card>
    </Grid>
  )
}