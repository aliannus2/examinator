import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CourseService from './../../services/CourseService';
import ResultService from './../../services/ResultService';
import StudentService from './../../services/StudentService';
import theme from './../../theme';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import logoImg from './../../assets/navbar-2.png';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


import { useHistory, useParams, } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        width: 400,
        margin: theme.spacing(1, 3, 2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),

    },
    align: {
        paddingTop: 100
    },
    padding: {
        paddingTop: 10,

        alignItems: 'center'
    },
    button: {
        borderRadius: 100,

    },
    logoImg: {
        width: 40,
        marginRight: 10
    },
    table: {
        minWidth: 650,
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '350px'
    },
    whiteColor: {
        color: theme.palette.primary.contrastText
    },
    color: {
        backgroundColor: theme.palette.primary.main
    }

}));

var examRoom;
var course;
var results;
var students = [];

const processDate = (date) => {
    date = new Date(date);

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const strTime = hours + ':' + minutes + ' ' + ampm;
    const strDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    return strDate + " " + strTime;
}

export default function Result() {

    examRoom = useParams().exam;
    const history = useHistory();
    const navigateTo = (path) => history.push(path);
    const [loading, setLoading] = React.useState(false);

    const courseId = useParams().course;
    const authToken = localStorage.getItem('auth-token');

    useEffect(() => {
        CourseService.getCourse(courseId, authToken, false).then((courseFromDb) => {
            course = courseFromDb;
            console.log("Course: ", course);
        });

        ResultService.getResults(examRoom, authToken).then(res => {
            // console.log(res);
            results = res;

            students = [];

            if (results && results.length > 0) {
                var requests = [];
                results.forEach(result => {
                    requests.push(fetchStudents(result.studentId));
                });

                Promise.all(requests).then(() => {
                    console.log("students: ", students);
                    console.log("Loading finished");
                    setLoading(true);
                })
            } else {
                setLoading(true);
            }
        })

    }, []);

    const fetchStudents = (studentId) => {
        return new Promise(resolve => {
            StudentService.getStudent(studentId, authToken)
                .then(student => {
                    students.push(student);
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((e) => {
                    console.log(e);
                });
        })
    }


    const classes = useStyles();


    var data = new FormData();

    return (
        <React.Fragment>
            {!loading ?
                <Loader type="BallTriangle" className={classes.loader} color={theme.palette.primary.main} height={80} width={80} />
                :
                <div>
                    <AppBar position="relative">

                        <Toolbar>
                            <Grid container spacing={2} justify='space-between' alignItems='center'>
                                <div>
                                    <Grid container>
                                        <Button className={classes.button} component={Link} to="/instructor/dashboard">
                                            <img src={logoImg} alt="logo" className={classes.logoImg} />

                                            <Typography className={classes.whiteColor} >
                                                {course ? course.courseName.toUpperCase() : "EXAMINATOR"}
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </div>
                            </Grid>
                        </Toolbar>


                    </AppBar>
                    <CssBaseline />
                    {results && results.length > 0 ?
                        <Container fixed>
                            <TableContainer component={Paper} style={{ marginTop: '25px', borderRadius: '15px' }}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead style={{ backgroundColor: theme.palette.primary.main }}>
                                        <TableRow>
                                            <TableCell className={classes.whiteColor}>Name</TableCell>
                                            <TableCell align="center" className={classes.whiteColor}>Reg No #</TableCell>
                                            <TableCell align="center" className={classes.whiteColor}>Obtained Marks</TableCell>
                                            <TableCell align="center" className={classes.whiteColor}>Total Marks</TableCell>
                                            <TableCell align="right" className={classes.whiteColor}>Submitted at</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {results.map((result, i) => (
                                            <TableRow key={result.studentId}>
                                                <TableCell component="th" scope="row">
                                                    {students[i].fName} {students[i].lName}
                                                </TableCell>
                                                <TableCell align="center">{students[i].regNo}</TableCell>
                                                <TableCell align="center">{result.obtainedMarks}</TableCell>
                                                <TableCell align="center">{result.totalMarks}</TableCell>
                                                <TableCell align="right">{processDate(result.createdAt)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                        :
                        <Grid container style={{ marginTop: '100px', marginLeft: '40%' }}>
                            <Typography variant="h4">
                                No Results Found
                            </Typography>

                        </Grid>
                    }
                </div>
            }
        </React.Fragment>
    )
};