import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './main.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '18vh',
    },
    paper: {
        backgroundColor: '#fff',
        height: '50vh',
        cursor: 'pointer',
        paddingTop: '5px',
    }
}));

function Main() {
    const classes = useStyles()

    return (
        <div>
            <Grid container className={classes.root} spacing={10}>
                <Grid item xs={4}>
                    <Link to="/Image_Classification" style={{ textDecoration: 'None' }}>
                        <Paper className={classes.paper} elevation={7}>
                            <div className="ImageClassification"></div>
                            <Divider />
                            <div style={{ height: '20px' }}></div>
                            <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }}>Image Classification</Typography>
                            <div style={{ height: '20px' }}></div>
                            <div className="note">Test already trained models or Train your own custom Image Classifier.</div>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to="/Object_Detection" style={{ textDecoration: 'None' }}>
                        <Paper className={classes.paper} elevation={7}>
                            <div className="objectDetection" ></div>
                            <Divider />
                            <div style={{ height: '20px' }}></div>
                            <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }}>Object Detection</Typography>
                            <div style={{ height: '20px' }}></div>
                            <div className="note">Detect the objects present in an Image.</div>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} elevation={7}>
                        <div className="poster"></div>
                        <Divider />
                        <div style={{ height: '20px' }}></div>
                        <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }}>coming soon</Typography>
                        <div style={{ height: '20px' }}></div>
                        <div className="note">Poster classification , Audio classification and few other projects will appear here once they are developed.</div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Main;