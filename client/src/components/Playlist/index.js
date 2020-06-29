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

export default function Playlist() {
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
                                <Overview/>
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                xl={9}
                                xs={12}
                            >
                                {!loading ?
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
                                            </TableContainer>
                                        </div>
                                    </Card> : <div></div>}
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

        </Card>
    );
}

