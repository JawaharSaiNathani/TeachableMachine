import { Button, Grid, makeStyles, Paper, Typography, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import './train.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '20px',
        width: '80%',
        margin: 'auto',
    },
    trainButton: {
        backgroundColor: '#4285F4',
        color: '#fff',
        width: '80%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#4285F4',
        }
    }
}));

const Train = ({ Classes, setErrorMsg, setCanEvaluate, setErrorSnackBarOpen, setTrainModelOpen, epochs, setEpochs }) => {
    const classes = useStyles();

    const handleTraining = () => {

        setCanEvaluate(false);
        let flag = 0;
        Classes.map((itemi) => {
            if (flag === 0 && itemi.images_no === 0) {
                flag = 1;
            }
        });
        if (flag === 1) {
            setErrorMsg("Each class should containes atleast one Image");
            setErrorSnackBarOpen(true);
        }
        else {
            setTrainModelOpen(true);
        }
    }

    return (
        <div className="paperContainer">

            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h6">Training</Typography>
                <div style={{ height: "20px" }}></div>
                <Button variant="outlined" className={classes.trainButton} onClick={() => { handleTraining(); }} >Train model</Button>
                <div style={{ height: "20px" }}></div>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography variant="overline">Epochs</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={epochs}
                            onChange={(e) => { setEpochs(e.target.value); }}
                        >
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={75}>75</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Train;