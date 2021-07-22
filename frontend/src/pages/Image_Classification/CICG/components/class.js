import { ClickAwayListener, Divider, Grid, InputBase, Typography, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import DragAndDrop from './dragAndDrop';
import './class.css';
import { Clear, ClearAll, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '20px',
    },
    ClassName: {
        fontSize: 'large',
        fontWeight: 'bolder',
        width: '100%',
        '&:hover': {
            backgroundColor: '#F5F5F5',
        }
    },
    editIcon: {
        color: "#000000",
    },
    uploadButton: {
        height: "50px",
        backgroundColor: "#4285F4",
        color: "#ffffff",
        float: "left",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: "#4285F4",
        }
    },
    imagesNumber: {
        paddingTop: "10px",
        paddingLeft: "220px",
        color: "#4285F4",
        fontWeight: 'bold',
    },
    divider: {
        backgroundColor: '#000',
        height: '2px',
    },
    headingContainer: {
        paddingTop: '10px',
    },
    heading: {
        fontStyle: 'italic',
        fontSize: 'small',
        color: "#eb0029",
    },
    icon: {
        color: '#eb0029',
        cursor: 'pointer',
    }
}));

const Class = ({ item, Classes, setClasses }) => {
    const classes = useStyles();
    const [nameofClass, setNameOfClass] = useState(item.name);
    const [isUploading, setIsUploading] = useState(false);

    const handleClassName = () => {
        if (nameofClass.length === 0) {
            setNameOfClass(item.name);
        }
        else {
            setClasses(Classes.map((itemi) => {
                if (itemi.id === item.id) {
                    return {
                        ...itemi, name: nameofClass
                    };
                }
                return itemi;
            }));
        }
    }

    const deleteCell = () => {
        setClasses(Classes.filter((itemi) => itemi.id !== item.id));
    }

    const topbar = () => {
        if (item.id < 3) {
            return (
                <Grid container>
                    <Grid item xs={11}>
                        <ClickAwayListener onClickAway={() => { handleClassName(); }}>
                            <InputBase
                                id="standard-read-only-input"
                                value={nameofClass}
                                onClick={(e) => { e.target.select() }}
                                onChange={(e) => { setNameOfClass(e.target.value) }}
                                className={classes.ClassName}
                                inputProps={{ 'aria-label': 'naked' }}
                            />
                        </ClickAwayListener>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Clear all samples">
                            <IconButton aria-label="Clear all samples" onClick={() => {
                                setClasses(Classes.map((itemi) => {
                                    if (itemi.id === item.id) {
                                        return {
                                            ...itemi, images: [], images_no: 0
                                        };
                                    }
                                    return itemi;
                                }));
                            }}>
                                <ClearAll className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            );
        }
        else {
            return (
                <Grid container>
                    <Grid item xs={10}>
                        <ClickAwayListener onClickAway={() => { handleClassName(); }}>
                            <InputBase
                                id="standard-read-only-input"
                                value={nameofClass}
                                onClick={(e) => { e.target.select() }}
                                onChange={(e) => { setNameOfClass(e.target.value) }}
                                className={classes.ClassName}
                                inputProps={{ 'aria-label': 'naked' }}
                            />
                        </ClickAwayListener>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Clear all samples">
                            <IconButton aria-label="Clear all samples" onClick={() => {
                                setClasses(Classes.map((itemi) => {
                                    if (itemi.id === item.id) {
                                        return {
                                            ...itemi, images: [], images_no: 0
                                        };
                                    }
                                    return itemi;
                                }));
                            }}>
                                <ClearAll className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Delete this Cell">
                            <IconButton aria-label="Delete this Cell" onClick={() => { deleteCell(); }}>
                                <Delete className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            );
        }
    }

    const heading = () => {
        if (isUploading === false) {
            return (
                <div className={classes.headingContainer}>
                    <Typography className={classes.heading}>Add Images using :</Typography>
                </div>
            )
        }
        else {
            return (
                <Grid container className={classes.headingContainer}>
                    <Grid item xs={11}>
                        <Typography className={classes.heading}>Images Uploaded :  {item.images_no}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Clear className={classes.icon} onClick={() => { setIsUploading(false); }} />
                    </Grid>
                </Grid>
            )
        }
    }

    const handleDrop = (files) => {
        let fileList = item.images
        for (var i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] === "image") {
                if (!files[i]) return
                fileList.push(files[i])
            }
        }
        setClasses(Classes.map((itemi) => {
            if (itemi.id === item.id) {
                return {
                    ...itemi, images: fileList, images_no: fileList.length
                };
            }
            return itemi;
        }));
    }

    const uploadSetion = () => {
        if (isUploading === false) {
            return (
                <div className="uploadSection">
                    <Button
                        variant="contained"
                        className={classes.uploadButton}
                        startIcon={<CloudUploadIcon />}
                        onClick={() => { setIsUploading(true); }}
                    >
                        Upload
                    </Button>
                    <Typography className={classes.imagesNumber}>Images Uploaded :  {item.images_no}</Typography>
                </div>
            )
        }
        else {
            return (
                <div className="dragAndDropSection">
                    <DragAndDrop handleDrop={handleDrop}></DragAndDrop>
                </div>
            )
        }
    }

    return (
        <div className="class">
            <Paper className={classes.paper} elevation={3}>
                {topbar()}
                <Divider className={classes.divider} />
                {heading()}
                {uploadSetion()}
            </Paper>
        </div>
    );
}

export default Class;