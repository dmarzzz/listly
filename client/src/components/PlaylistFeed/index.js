import React from 'react'
import { makeStyles, Card, CardHeader, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import useAxios from 'axios-hooks'

const columns = [
  { id: 'rank', label: '#', align: 'inherit' },
  { id: 'playlistName', label: 'Playlist Name', align: 'inherit' },
  { id: 'songs', label: 'Songs', align: 'right' },
  { id: 'upVotes', label: 'Up Votes', align: 'right' },
]

const useStyles = makeStyles(() => ({
  root: {
    background: '#282C34',
    color: 'white',
  },
  title: {
    color: 'white',
  },
  upvote: {
    background: '#282C34',
    color: 'white',
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

export default function PlaylistFeed() {
  const classes = useStyles();
  const [showPlaylist, setShowplaylist] = React.useState(false);

  const [{ data, loading, error }] = useAxios({
    method: 'get',
    url: '/api/playlists'
  })
  if (error) {
    console.log(error)
  }

  const handlePlaylistOpen = () => {
    setShowplaylist(!showPlaylist);
  };

  return (
    <Card classes={{
      root: classes.root,
    }} >
      {!showPlaylist ? (<div>

        <CardHeader
          title={<Typography variant="h5" component="h2">
            Global Playlist Feed&nbsp;&nbsp;<span role="img" aria-label="party-cone">🎉</span>
          </Typography>} />
        <CardContent>
          <div className={classes.hoverEffect}>
            {!loading ?
              <TableContainer className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead  >
                    <TableRow>
                      {columns.map((column) => (<TableCell key={column.label} align={column.align} className={classes.title}> {column.label} </TableCell>))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) =>
                      (
                        <TableRow hover key={row.name} className={classes.title} onClick={handlePlaylistOpen}  >
                          <TableCell className={classes.title} scope="row"  >
                            {row.name}
                          </TableCell>
                          <TableCell scope="row" className={classes.title}  >
                            {row.name}
                          </TableCell>
                          <TableCell align="right" className={classes.title} >{row.rating}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer> : <div></div>
            }
          </div>
        </CardContent>
      </div>) : (<div>
        <CardHeader
          title={<Typography variant="h5" component="h2">
            Playlist Name
                        </Typography>} />
        <CardContent>
          <div >
            <TableContainer className={classes.root}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <TableCell className={classes.title} > # </TableCell>
                    <TableCell className={classes.title} > Playlist Name</TableCell>
                    <TableCell className={classes.title} > Duration (mins) </TableCell>
                    <TableCell className={classes.title} >Up Votes </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow hover key={row.num} className={classes.title} onClick={(event) => console.log('balh')}  >
                      <TableCell key={row.num} className={classes.title} o scope="row"  >
                        {row.num}
                      </TableCell>
                      <TableCell scope="row" className={classes.title}  >
                        {row.name}
                      </TableCell>
                      <TableCell align="right" className={classes.title} > <p > {row.calories} </p> </TableCell>
                      <TableCell align="right" className={classes.title} >{row.fat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </div>)}

    </Card>
  );
}

