import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './index.css';

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

function Image_Classification_HomePage() {
    const classes = useStyles()

    return (
        <div>
            <Grid container className={classes.root} spacing={10}>
                <Grid item xs={4}>
                    <Link to="/Image_Classification/dog_cat_classifier" style={{ textDecoration: 'None' }}>
                        <Paper className={classes.paper} elevation={3}>
                            <div className="dogCat"></div>
                            <Divider />
                            <div style={{ height: '20px' }}></div>
                            <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }}>Cat / Dog</Typography>
                            <div style={{ height: '20px' }}></div>
                            <div className="note">Classify images between Dog and Cat.</div>
                        </Paper>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                <Link to="/Image_Classification/rick_morty_classifier" style={{ textDecoration: 'None' }}>
                    <Paper className={classes.paper} elevation={3}>
                        <div className="rickMorty" ></div>
                        <Divider />
                        <div style={{ height: '20px' }}></div>
                        <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }}>Rick / Morty</Typography>
                        <div style={{ height: '20px' }}></div>
                        <div className="note">Classify images between Rick and Morty.</div>
                    </Paper>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link to="/Image_Classification/custom_image_classifier" style={{ textDecoration: 'None' }}>
                        <Paper className={classes.paper} elevation={3}>
                            <div className="custom"></div>
                            <Divider />
                            <div style={{ height: '20px' }}></div>
                            <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }}>Custom Project</Typography>
                            <div style={{ height: '20px' }}></div>
                            <div className="note">Train your own custom Image classification model by uploading images.</div>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Image_Classification_HomePage;