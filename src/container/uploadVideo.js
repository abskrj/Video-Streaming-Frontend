import { Container, Input, Button, TextField, FormHelperText } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import "../assets/css/upload.css";
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';

export default function UploadVideo() {

    const [video, setVideo] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoTags, setVideoTag] = useState('');
    const [videoCategory, setVideoCategory] = useState('');
    const [disableUploadSubmit, setDisableUploadSubmit] = useState(false);
    const [disableRegisterSubmit, setDisableRegisterSubmit] = useState(true);
    const [progress, setProgress] = useState(null);


    useEffect(() => {
        const lastLogin = parseInt(localStorage.getItem('lastLogin')) || null;

        if (!lastLogin) {
            createAlert('error', 'Please login before uploading video.');
            setDisableUploadSubmit(true);
            setDisableRegisterSubmit(true);
            return;
        }

        const validLoginTime = lastLogin + 604800000;

        if (validLoginTime < Date.now()) {
            createAlert('error', 'Please login before uploading video.')
            setDisableUploadSubmit(true);
            setDisableRegisterSubmit(true);
            return;
        }


    }, [])

    const videoSubmit = (event) => {
        event.preventDefault();
        setDisableUploadSubmit(true);
        deleteAlert();

        // console.log(video.);

        const data = new FormData();

        data.append('video', video)

        const accessToken = localStorage.getItem('accessToken') || null;

        setProgress(<LinearProgress />);

        if (!accessToken) {
            createAlert('error', 'Please Login/Register');
            return;
        }
        createAlert('info', 'Video Uploading, Fill the below form.');

        const axiosConfig = {
            headers: {
                "x-access-token": accessToken,
                "Content-type": "multipart/form-data",
            }
        }

        axios.post('https://api.codedoc.tech/api/video/upload', data, axiosConfig)
            .then((res) => {
                console.log(res);
                createAlert('info', 'Video Processing, Submit the below form (if not submitted) ');
                setDisableRegisterSubmit(false);
                setVideoId(res.data.videoId);
            })
            .catch((err) => {
                setDisableRegisterSubmit(true);
                setDisableUploadSubmit(false);

                if (err.response) {
                    createAlert('error', err.response.data.message);
                }
            });
        setProgress(null);
    }

    const videoRegister = (event) => {
        event.preventDefault();
        console.table({ videoId, videoTitle, videoDescription, videoTags, videoCategory })
        deleteAlert();

        const data = {
            "videoId": videoId,
            "title": videoTitle,
            "description": videoDescription,
            "tags": videoTags,
            "category": videoCategory
        }

        const axiosConfig = {
            headers: {
                'x-access-token': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            }
        }

        axios.post('https://api.codedoc.tech/api/video/register', data, axiosConfig)
            .then((res) => {
                console.log(res);
                deleteAlert();
                createAlert('success', "Video registered, you will be informed when video is ready");
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response) {
                        deleteAlert();
                        createAlert('error', "Something went wrong");
                    }
                }
            });
    }

    const createAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setAlert(true);
    }

    const deleteAlert = () => {
        setAlert(null);
    }

    return (
        <>
            <Container component="main" maxWidth="xs" >

                <div className="videoUpload__main">
                    <h2>Upload Video </h2>


                    <form className="videoUpload__Videoform" >
                        <Input className="videoUpload__input" type="file" autoFocus onChange={event => setVideo(event.target.files[0])} />
                        <Button disabled={disableUploadSubmit} variant="outlined" type="submit" onClick={videoSubmit}> Upload  <BackupOutlinedIcon /></Button>
                    </form>
                    {
                        (alert) ? <Alert severity={alertType}>{alertMessage}</Alert> : null
                    }

                    <h2>Then</h2>

                    <form className="videoUpload__register">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="Video Title"
                            name="title"
                            autoFocus
                            onChange={event => setVideoTitle(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            placeholder="Video Description"
                            type="text"
                            onChange={event => setVideoDescription(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="tags"
                            placeholder="Tags"
                            type="text"
                            helperText="Enter Comma Seperated Tags"
                            onChange={event => setVideoTag(event.target.value)}
                        />
                        <select name="category" onChange={event => setVideoCategory(event.target.value)}>
                            <option value="Blog">Blog</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Education">Education</option>
                            <option value="How to">How to</option>
                            <option value="News">News</option>
                            <option value="Non-Profit">Non-Profit</option>
                            <option value="Science and Tech">Science and Tech</option>
                        </select>

                        <FormHelperText>Choose Category</FormHelperText>
                        <Button disabled={disableRegisterSubmit} fullWidth onClick={videoRegister} type="submit" variant="outlined">Submit</Button>
                    </form>

                </div>
            </Container>

            {
                progress
            }

        </>


    )
}
