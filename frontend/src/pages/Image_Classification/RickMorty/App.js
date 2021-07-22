import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider, Grid, Typography, Snackbar, Button, LinearProgress } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from '../../../Axios';

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
    progressBar: {
        height: '40px',
        width: '80%',
        float: 'left',
        borderRadius: '5px',
        backgroundColor: 'rgba(255,101,0,0.3)',
        color: '#000',
    },
    progressBar2: {
        height: '40px',
        width: '80%',
        float: 'left',
        borderRadius: '5px',
        backgroundColor: 'rgba(123,43,226,0.3)',
        color: '#000',
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RickMorty() {
    const classes = useStyles()
    const [image, setImage] = useState();
    const [rick, setRick] = useState(50);
    const [morty, setMorty] = useState(50);
    const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
    const [errorMsg,setErrorMsg] = useState("Choose image for evaluation.");

    const imageRef = useRef(null);

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "rgb(255,101,0)"
            },
            secondary: {
                main: "rgb(123,43,226)"
            }
        },
    });

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
    }, [image]);

    const handleTest = () => {
        if (image) {
            let reqBody = new FormData();
            reqBody.append('image', image);

            Axios.post('/api/rickVSmorty/evaluate', reqBody, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {

                    console.log(res)

                    if (res.status === 200) {
                        setRick(res.data['rick']);
                        setMorty(res.data['morty']);
                        console.log('Successfully evaluated image');
                    }
                    else {
                        setErrorMsg('Unable to evaluate the image due to server side issues.');
                        setErrorSnackBarOpen(true);
                        console.log("Failed to evaluate :(");
                    }
                })
                .catch(err => {
                    setErrorMsg('Unable to evaluate the image due to server side issues.');
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
        <ThemeProvider theme={theme}>
            <div>
                <Grid container className={classes.root} spacing={10}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper} elevation={3}>
                            <Typography variant="overline" style={{ fontSize: 'large', fontWeight: 'bolder', paddingLeft: '5%', color: '#eb0029' }} >Rick / Morty</Typography>
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
                                <Button variant="outlined" className={classes.evaluateButton} onClick={() => { handleTest() }}>TEST</Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.paper} elevation={3}>
                            <div style={{ height: '100px' }}>
                                <Grid container spacing={0} style={{ height: '100%' }}>
                                    <Grid item xs={4} style={{ paddingTop: '30px', paddingLeft: '40px' }}>
                                        <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', color: '#eb0029' }}>Rick</Typography>
                                    </Grid>
                                    <Grid item xs={8} style={{ paddingTop: '30px' }}>
                                        <LinearProgress color="primary" className={classes.progressBar} variant="determinate" value={parseInt(rick)} />
                                        <Typography style={{ paddingRight: '15px', paddingTop: '5px', fontSize: 'large', fontWeight: 'bolder', color: 'rgb(255,101,0)', float: 'right' }}>{rick}%</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            <Divider />
                            <div style={{ height: '100px' }}>
                                <Grid container spacing={0} style={{ height: '100%' }}>
                                    <Grid item xs={4} style={{ paddingTop: '30px', paddingLeft: '40px' }}>
                                        <Typography variant="overline" style={{ fontSize: 'medium', fontWeight: 'bolder', color: '#eb0029' }}>Morty</Typography>
                                    </Grid>
                                    <Grid item xs={8} style={{ paddingTop: '30px' }}>
                                        <LinearProgress color="secondary" className={classes.progressBar2} variant="determinate" value={parseInt(morty)} />
                                        <Typography style={{ paddingRight: '15px', paddingTop: '5px', fontSize: 'large', fontWeight: 'bolder', color: 'rgb(123,43,226)', float: 'right' }}>{morty}%</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Snackbar open={errorSnackBarOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error">
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </div>
        </ThemeProvider>
    );
}

export default RickMorty;