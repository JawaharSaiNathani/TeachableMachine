import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider, Grid, Typography, Button, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from '../../Axios';
import './App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '18vh',
    },
    paper: {
        backgroundColor: '#fff',
        padding: '20px',
    },
    evaluateButton: {
        backgroundColor: '#4285F4',
        color: '#fff',
        width: '50%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#4285F4',
        }
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Object_Detection() {
    const classes = useStyles()
    const [image, setImage] = useState();
    const [detected, setDetected] = useState();
    const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Choose image for evaluation.");

    const imageRef = useRef(null);


    const handleFileUpload = (e) => {
        setImage(e.target.files[0]);
    }

    useEffect(() => {
        if (!!image) {
            let reader = new FileReader();

            reader.onload = (e) => {
                imageRef.current.src = e.target.result;
            }

            reader.readAsDataURL(image);
        }
    }, [image])

    const imageDisplay = () => {
        if (detected) {
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={detected} alt="" width="100%" />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="note">
                    After Object Detection, Detected Image with labels in form of boxes will be displayed here.
                </div>
            )
        }
    }

    const handleDetect = () => {
        setDetected("");
        if (image) {
            let reqBody = new FormData();
            reqBody.append('image', image);

            Axios.post('/api/object_detection/detect', reqBody, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {

                    console.log(res)

                    setDetected('http://127.0.0.1:5000/detected_images/'+res.data['result'])

                    if (res.status === 200) {
                        console.log('Successfully detected Objects');
                    }
                    else {
                        setErrorMsg('Unable to detect objects in image, due to server side issues.');
                        setErrorSnackBarOpen(true);
                        console.log("Failed to evaluate :(");
                    }
                })
                .catch(err => {
                    setErrorMsg('Unable to detect objects in image, due to server side issues.');
                    setErrorSnackBarOpen(true);
                    console.log(err);
                })
            
            
        }
        else {
            setErrorMsg('Choose image for evaluation.');
            setErrorSnackBarOpen(true);
        }
    }

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackBarOpen(false);
    };

    return (
        <div>
            <Grid container className={classes.root} spacing={10}>
                <Grid item xs={4}>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="overline" style={{ fontSize: 'large', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }} >Object Detection</Typography>
                        <Divider />
                        <div style={{ height: "30px" }}></div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
                            <input
                                type='file'
                                accept="image/*"
                                className='custom-file-input'
                                id='customFile'
                                onChange={handleFileUpload}
                            />
                            <div style={!image ? { display: 'none' } : { marginTop: "10px", textAlign: 'center', maxWidth: '100%' }}>
                                <img src="#" ref={imageRef} alt="upload image here" width="100%" />
                            </div>
                        </div>
                        <div style={{ height: "30px" }}></div>
                        <div style={{ textAlign: "center" }}>
                            <Button variant="outlined" className={classes.evaluateButton} onClick={() => { handleDetect() }}>DETECT</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper} style={{textAlign: 'center'}} elevation={3}>
                        <Typography variant="overline" style={{ fontSize: 'large', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }} >Detected Image</Typography>
                        <Divider />
                        {imageDisplay()}
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={errorSnackBarOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Object_Detection;