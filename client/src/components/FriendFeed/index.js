import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',//'#282C34',     
    color: 'white',
  },
  title: {
    color: 'white',
  },
  table: {
    minWidth: 550,
  },
  hoverEffect: {
    '& tbody>.MuiTableRow-root:hover': {
      color: 'white',
      background: 'rgba(40, 44, 52, 0.2)', //https://stackoverflow.com/questions/5662178/opacity-of-divs-background-without-affecting-contained-element-in-ie-8
    }
  },
}));

function createData(num, name, calories, fat, carbs, protein) {
  return { num, name, calories, fat, carbs, protein };
}

const rows = [
  createData('1', 'Obreezy Tapes', 159, 6.0),
  createData('2', 'Ate Too Much Pizza in Cambodia Jams', 237, 9.0),
  createData('3', 'High Im Hi', 262, 16.0),
  createData('4', 'Jamuary', 305, 3.7),
  createData('5', 'Quarantunes', 356, 16.0),
];

export default function FriendFeed() {
  const classes = useStyles();

  return (
    <Card classes={{
      root: classes.root,
    }} >
      <CardHeader
        title={<Typography variant="h5" component="h2">
          Friend Playlist Feed&nbsp;&nbsp;<span role="img" aria-label="three-sets-of-people">👫👫👫</span>
                        </Typography>} />
      <CardContent>
        <div className={classes.hoverEffect}>
          <TableContainer className={classes.root}>
            <Table className={classes.table} aria-label="simple table">

              <TableHead>
                <TableRow >
                  <TableCell className={classes.title} > # </TableCell>
                  <TableCell className={classes.title} > Playlist Name</TableCell>
                  <TableCell align="right" className={classes.title} > Duration (mins) </TableCell>
                  <TableCell align="right" className={classes.title} >Up Votes </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell scope="row" className={classes.title} >
                      {row.num}
                    </TableCell>
                    <TableCell scope="row" className={classes.title} >
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
    </Card>
  );
}
