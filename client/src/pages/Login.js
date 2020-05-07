import React, { useState } from 'react';
import { Card, makeStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { UserConsumer } from '../contexts/UserContext';
import Register from './Register';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(6),
    },
    card: {
        padding: theme.spacing(4),
        marginTop: "100px",
        marginLeft: "20%",
        marginRight: "20%",
        //background: '#ffffff',
    },
    bg: {
        paddingTop: "10%",
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'absolute',
        height: '100vh',
    }
}));

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ loadRegister , setLoadRegister] = useState(false);
    const classes = useStyles();

    function handleRegister() {
        setLoadRegister(true);
    }

    function submitLogin( handleLogin , user ) {
        fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    handleLogin(username);
                    console.log("we logged in mo");
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });

    }

    return (
        <UserConsumer>
            { ({ onLogin }) => (    
                !loadRegister ?     
                <div className={classes.bg} >
                    <Card className={classes.card} >
                        <div className={classes.margin}>
                            <Grid container spacing={8} alignItems="flex-end">

                                <Grid item>
                                    <Face />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField label="Username" type="username" onChange={e => setUsername(e.target.value)} fullWidth autoFocus required />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Fingerprint />
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <TextField label="Password" type="password" color="primary" onChange={e => setPassword(e.target.value)} fullWidth required />
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" justify="space-between">
                                <Grid item>
                                    <FormControlLabel control={
                                        <Checkbox
                                            color="secondary"
                                        />
                                    } label="Remember me" />
                                </Grid>
                                <Grid item>
                                    <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} onClick={handleRegister} variant="text" color="primary">Need to Register ?</Button>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" style={{ marginTop: '10px' }}>
                                <Button variant="outlined" color="primary" onClick={ e => submitLogin( onLogin ) } style={{ textTransform: "none" }}>Login</Button>
                            </Grid>
                        </div>
                    </Card>
                </div> : <div> <Register /> </div>
            )}
        </UserConsumer>
    )


}