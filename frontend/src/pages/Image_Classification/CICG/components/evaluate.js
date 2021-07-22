import { Button, makeStyles, Paper, Typography, Divider } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import Axios from '../../../../Axios';
import './train.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '20px',
        width: '80%',
        margin: 'auto',
    },
    evaluateButton_enabled: {
        backgroundColor: '#4285F4',
        color: '#fff',
        width: '80%',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#4285F4',
        }
    },
    evaluateButton_disabled: {
        backgroundColor: '#D3D3D3',
        width: '80%',
        textTransform: 'none',
    },
    classNames: {
        paddingRight: '20px',
    }
}));

const Evaluate = ({ thumbnail, setThumbnail, canEvaluate, setErrorMsg, setErrorSnackBarOpen }) => {
    const classes = useStyles();
    const [isDisplayInfo, setIsDisplayInfo] = useState(false);
    const [info, setInfo] = useState();

    const handleFileUpload = (e) => {
        setThumbnail(e.target.files[0]);
    }

    const imageRef = useRef(null);

    useEffect(() => {
        if (canEvaluate === false)
        {
            setIsDisplayInfo(false);
        }
    }, [canEvaluate])

    useEffect(() => {
        if (!!thumbnail) {
            let reader = new FileReader();

            reader.onload = (e) => {
                imageRef.current.src = e.target.result;
            }

            reader.readAsDataURL(thumbnail);
        }
    }, [thumbnail])

    const handleEvaluate = () => {

        setIsDisplayInfo(false);

        if (thumbnail) {
            let reqBody = new FormData();
            reqBody.append('image', thumbnail);

            Axios.post('/api/custom/evaluate', reqBody, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {

                    console.log(res)

                    if (res.status === 200) {
                        if (res.data['result'] && res.data['result'] === '0') {
                            setErrorMsg('Unable to Evaluate the Model. Please Train the Model again.');
                            setErrorSnackBarOpen(true);
                            console.log('lost class names. Train the Model again.');
                        }
                        else {
                            setInfo(res.data);
                            setIsDisplayInfo(true);
                            console.log("Sucessfully evaluated :)");
                        }
                    }
                    else {
                        setErrorMsg('Unable to Evaluate the Model. Please Train the Model again.');
                        setErrorSnackBarOpen(true);
                        console.log("Failed to evaluate :(");
                    }
                })
                .catch(err => {
                    setErrorMsg('Unable to Evaluate the Model. Please Train the Model again.');
                    setErrorSnackBarOpen(true);
                    console.log(err);
                })
        }
        else {
            setErrorMsg('Choose image for evaluation.');
            setErrorSnackBarOpen(true);
        }

    }

    useEffect(() => {
        if (isDisplayInfo === true) {
            let container1 = document.getElementById('classNamesContainer');
            let container2 = document.getElementById('scoresContainer');
            for (let key in info) {
                if (key !== 'result') {
                    container1.innerHTML += '<div>' + key + '</div>';
                    container2.innerHTML += '<div>' + info[key] + '</div>';
                }
            }
        }
    }, [isDisplayInfo])

    const display_info = () => {
        if (isDisplayInfo === true) {
            return (
                <div>
                    <div style={{ height: "30px" }}></div>
                    <Divider />
                    <div style={{ height: "30px" }}></div>
                    <div id="infoContainer" className="row">
                        <div id="classNamesContainer" className="column1"></div>
                        <div id="scoresContainer" className="column2"></div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                <div style={{ height: "20px" }}></div>
                <Divider />
                <div style={{ height: "10px" }}></div>
                <div className="note">You must train a model on left before you can evaluate it.</div>
                </div>
            )
        }
    }

    return (
        <div className="paperContainer">
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h6">Evaluation</Typography>
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
                    <div style={!thumbnail ? { display: "none" } : { marginTop: "10px" }}>
                        <img src="#" ref={imageRef} alt="" width="100%" height="100%" />
                    </div>
                </div>
                <div style={{ height: "30px" }}></div>
                <div style={{textAlign:"center"}}>
                <Button variant="outlined" disabled={!canEvaluate} className={`${canEvaluate ? classes.evaluateButton_enabled : classes.evaluateButton_disabled}`} onClick={() => { handleEvaluate() }}>EVALUATE</Button>
                </div>
                {display_info()}
            </Paper>
        </div>
    )
}

export default Evaluate;