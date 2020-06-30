import React from 'react'
import { Card, CardHeader, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import useAxios from 'axios-hooks'
import {
    Grid,
    Container,
    makeStyles
} from '@material-ui/core'
import GenreChart from '../GenreChart'
import Overview from './Overview'




const columns = [
    { id: 'title', label: 'Title', align: 'inherit' },
    { id: 'artist', label: 'Artist', align: 'inherit' },
    { id: 'album', label: 'Album', align: 'right' },
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

export default function Playlist(props) {
    const {playlistID} = props.match.params
    console.log(playlistID) // "foo"

    const classes = useStyles();
    const [showPlaylist, setShowplaylist] = React.useState(false);

    const [{ data, loading, error }] = useAxios({
        method: 'post',
        url: '/api/playlistById',
        params : {id: playlistID}
    })
    if (error) {
        console.log(error)
    }

    console.log("data is : " , data)
    

    const handlePlaylistOpen = () => {
        setShowplaylist(!showPlaylist);
    };

    return (
        <div>
        {!loading ?
        <Card classes={{
            root: classes.root,
        }} >
            <div>

                <CardHeader
                    title={<Typography variant="h5" component="h2">
                        Playlist
                    </Typography>} />
                <CardContent>


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
                                xs={12}
                            >
                                <Overview data={data} />
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                xl={9}
                                xs={12}
                            >
                                
                                    <Card>
                                        <div className={classes.hoverEffect}>
                                            <TableContainer className={classes.root}>
                                                <Table className={classes.table} aria-label="simple table">
                                                    <TableHead  >
                                                        <TableRow>
                                                            {columns.map((column) => (<TableCell key={column.label} align={column.align} className={classes.title}> {column.label} </TableCell>))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {data.tracks.map((track) =>
                                                            (
                                                                <TableRow hover key={track.name} className={classes.title} onClick={handlePlaylistOpen}  >
                                                                    <TableCell className={classes.title} scope="row"  >
                                                                        {track.track.name}
                                                                    </TableCell>
                                                                    <TableCell scope="row" className={classes.title}  >
                                                                        {track.track.artistName}
                                                                    </TableCell>
                                                                    <TableCell align="right" className={classes.title} >{track.track.albumName}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </Card> 
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                xl={3}
                                xs={12}
                            >
                                <GenreChart />
                            </Grid>

                        </Grid>
                    </Container>

                </CardContent>
            </div>

        </Card> : <div></div>}</div>
    );
}

