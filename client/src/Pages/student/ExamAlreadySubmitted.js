import React from 'react';
import AppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 120
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        borderRadius: 100,
    },
    avatar: {
        font: "1500px",
        width: "100px",
        height: "150px",
        color: theme.palette.secondary.main
    },
    margin: {
        marginTop: 50
    }
}));

export default function ExamAlreadySubmitted() {

    const classes = useStyles();

    return (


        <React.Fragment>
            <AppBar />
            <CssBaseline />

            <Container fixed>
            <div className={classes.root}>
                    <Grid container spacing={2} align='center' justify='center' >
                        <Grid item >
                            <CheckCircleOutlineIcon className={classes.avatar}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ color: 'green' }}>
                                Your exam has already been submitted.
                            </Typography>
                        </Grid>
                        <Grid xs={12} className={classes.margin}>
                            <Button className={classes.button}
                                variant="contained"
                                color="primary"
                                component={Link} to="../Dashboard">
                                Return to Dashboard
                            </Button>
                        </Grid>

                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )
};