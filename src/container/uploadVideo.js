import { Container, Typography, CssBaseline, FormControl, Input, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import "../assets/css/upload.css";
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import Alert from '@material-ui/lab/Alert';
import axios from "axios"


export default function UploadVideo() {

    const [video, setVideo] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);

    useEffect(() => {
        const lastLogin = parseInt(localStorage.getItem('lastLogin')) || null;

        if (!lastLogin) {
            createAlert('error', 'Please login before uploading video.')
            return;
        }

        const validLoginTime = lastLogin + 604800000;

        if (validLoginTime < Date.now()) {
            createAlert('error', 'Please login before uploading video.')
            return;
        }


    }, [])

    const videoSubmit = (event) => {
        event.preventDefault();
        deleteAlert();

        const data = {
            video: video
        }

        const axiosConfig = {
            headers: {
                'x-access-token': localStorage.getItem('accessToken')
            }
        }

        axios.post('https://radiant-dawn-27084.herokuapp.com/api/video/upload', data, axiosConfig)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="videoUpload__main">
                <Typography component="h1" variant="h5">
                    Upload Video
                </Typography>
                <form>
                    <FormControl>
                        <Input type="file" autoFocus onChange={event => setVideo(event.target.files[0])} />
                        {/* <Input type="file" autoFocus /> */}
                        <Button type="submit" onClick={videoSubmit}> Upload  <BackupOutlinedIcon /></Button>
                    </FormControl>
                </form>
            </div>
            {
                (alert) ? <Alert severity={alertType}>{alertMessage}</Alert> : null
            }
        </Container>
    )
}
