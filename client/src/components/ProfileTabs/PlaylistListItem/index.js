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

export default function PlaylistListItem(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false)
  console.log(props)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const sample = props.playlist.tracks.slice(0, 4).map(pTrack => {
    return <li>{pTrack.track.artistName} - {pTrack.track.name}</li>
  });

  return (
    <Grid item xs={4}>
      <Card className={classes.root} border={1} onClick={handleExpandClick}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" carient="h5">
              {props.playlist.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Created By: {props.playlist.owner}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Songs: {props.playlist.tracks.length}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Followers: {props.playlist.followers}
            </Typography>

          </CardContent>
          <CardMedia 
            className={classes.cover}
            image={props.playlist.image}
            title="Shours"
          />
        </div>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ol>
              {sample}
            </ol>
          </CardContent>
        </Collapse>

      </Card>
    </Grid>
  )
}