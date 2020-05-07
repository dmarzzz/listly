import React, { useState } from 'react';
import { Card, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function getSteps() {
    return ['Personal Info', 'Account Info', '2FA'];
}



const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    stepper: {
        width: '50%',
        marginLeft: "20%",
        marginRight: "20%",
    },
    margin: {
        margin: theme.spacing(6),
    },
    card: {
        padding: theme.spacing(4),
        marginLeft: "20%",
        marginRight: "20%",
        //background: '#ffffff',
        zIndex: '999'
    },
    bg: {
        paddingTop: "10%",
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'absolute',
        height: '100vh',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));


export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const welcomeArray = ["Welcome!", "Welcome!", "¡Bienvenida!", "Bienvenue!", "Welcome!", "Herzlich willkommen!", "أهلا بك!", "Welcome!"];

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function submitLogin() {

        fetch('api/register', {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
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

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField label="First Name" type="firstName"  fullWidth autoFocus required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField label="Last Name" type="lastName" color="primary"  fullWidth required />
                            </Grid>
                        </Grid>
                    </div>)
            case 1:
                return (
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField label="Username" type="username" onChange={e => setUsername(e.target.value)} fullWidth autoFocus required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField label="Password" type="password" color="primary" onChange={e => setPassword(e.target.value)} fullWidth required />
                            </Grid>
                        </Grid>
                    </div>)
            case 2:
                return (<div></div>)
            default:
                return 'Unknown step';
        }
    }

    return (


        <div className={classes.bg}>
            <Card className={classes.card} >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index)}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                  </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" onClick={submitLogin} style={{ textTransform: "none" }}>Register</Button>
                        </Grid>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
          </Button>
                    </Paper>
                )}

            </Card>
        </div>
    )
                        

}