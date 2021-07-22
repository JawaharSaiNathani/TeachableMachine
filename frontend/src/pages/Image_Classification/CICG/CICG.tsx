import React, { useState } from 'react';
import Axios from '../../../Axios';
import Class from './components/class';
import AddClass from './components/addClass';
import Train from './components/train';
import Evaluate from './components/evaluate';
import { makeStyles, Grid, Snackbar, Modal, Typography, Button, Divider, LinearProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import './App.css';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '300px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  trainButton: {
    backgroundColor: '#4285F4',
    borderRadius: '0px',
    color: '#fff',
    width: '50%',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#4285F4',
    }
  },
  cancelButton: {
    backgroundColor: '#ff6c5c',
    borderRadius: '0px',
    color: '#fff',
    width: '50%',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ff6c5c',
    }
  },
  divider: {
    backgroundColor: '#000',
    height: '2px',
  },
  training: {
    padding: '20px',
  },
}));

function Cicg() {
  const classes = useStyles();

  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
  const [errorMsg,setErrorMsg] = useState("Each class should containes atleast one Image");
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [trainModelOpen, setTrainModelOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [epochs, setEpochs] = useState(25);
  const [thumbnail, setThumbnail] = useState();
  const [ istraining , setIstraining ] = useState(false);
  const [ canEvaluate, setCanEvaluate ] = useState(false);

  const [Classes, setClasses] = useState([
    {
      id: 1,
      name: "class 1",
      images_no: 0,
      images: [],
    },
    {
      id: 2,
      name: "class 2",
      images_no: 0,
      images: [],
    }
  ])

  const handleErrorClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackBarOpen(false);
  };

  const handleSuccessClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackBarOpen(false);
  };

  const handleTrain = () => {

    setTrainModelOpen(false);
    setIstraining(true);

    let reqBody = new FormData();

    reqBody.append('epochs', epochs.toString());

    for (var j = 0; j < Classes.length; j++) {
      for (let key in Classes[j]) {
        if (key !== 'images') {
          reqBody.append((j + 1).toString() + "_" + key, (Classes[j] as any)[key]);
        }
        else {
          for (var i = 0; i < Classes[j][key].length; i++) {
            reqBody.append((j + 1).toString() + "_" + (i + 1).toString(), Classes[j][key][i]);
          }
        }
      }
    }

    Axios.post('/api/custom/train', reqBody, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {

        setIstraining(false);
        setSuccessSnackBarOpen(true);
        setCanEvaluate(true);

        if (res.status === 200) {
          console.log("Sucessfully trained the model :)");
        }
        else {
          setErrorMsg("Unable to Train the Model due to Server Side Issues");
          setErrorSnackBarOpen(true);
          console.log("Failed to train the model :(");
        }
      })
      .catch(err => {
        console.log(err);
        setIstraining(false);
        setErrorMsg("Unable to Train the Model due to Server Side Issues");
        setErrorSnackBarOpen(true);
      })
  }

  const modelBody = () => {
    let no_of_classes = 0;
    let no_of_images = 0;
    Classes.map((itemi) => {
      no_of_classes = no_of_classes + 1;
      no_of_images = no_of_images + itemi.images_no;
    })
    return (
      <div style={modalStyle} className={classes.paper}>
        <Typography align="center" variant="h6">INFORMATION</Typography>
        <Divider className={classes.divider} />
        <div style={{ height: "20px" }}></div>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Typography variant="overline">Total Classes</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="body2">{no_of_classes}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Typography variant="overline">Total Images</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="body2">{no_of_images}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Typography variant="overline">Epochs</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="body2">{epochs}</Typography>
          </Grid>
        </Grid>
        <div style={{ height: "50px" }}></div>
        <Button variant="text" className={classes.trainButton} onClick={() => { handleTrain() }} >Train</Button>
        <Button variant="text" className={classes.cancelButton} onClick={() => { setTrainModelOpen(false); }} >Cancel</Button>
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={5}>
          <div className="classesSection">
            {Classes.map(item => (
              <Class key={item.id} item={item} Classes={Classes} setClasses={setClasses} />
            ))}
            <AddClass Classes={Classes} setClasses={setClasses} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={{ height: "100%", width: '100%', position: 'relative' }}>
            <Train Classes={Classes} setErrorMsg={setErrorMsg} setCanEvaluate={setCanEvaluate} setErrorSnackBarOpen={setErrorSnackBarOpen} setTrainModelOpen={setTrainModelOpen} epochs={epochs} setEpochs={setEpochs} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={{ height: "100%", width: '100%', position: 'relative' }}>
            <Evaluate thumbnail={thumbnail} setThumbnail={setThumbnail} canEvaluate={canEvaluate} setErrorMsg={setErrorMsg} setErrorSnackBarOpen={setErrorSnackBarOpen}/>
          </div>
        </Grid>
      </Grid>
      <Modal
        open={trainModelOpen}
        onClose={() => { setTrainModelOpen(false); }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modelBody()}
      </Modal>
      <Modal
        open={istraining}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
        <Typography variant="overline" className={classes.training}>Model is Training Please wait.</Typography>
        <LinearProgress />
        </div>
      </Modal>
      <Snackbar open={errorSnackBarOpen} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={successSnackBarOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success">
          Model is Successfully Trained.
        </Alert>
      </Snackbar>

    </div>
  );
}

export default Cicg;