import { Container, Input, Button, TextField, MenuItem, Select, FormHelperText } from '@material-ui/core';
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
        <Container component="main" maxWidth="xs" >
            <h2>Upload Video</h2>

            <div className="videoUpload__main">

                <form className="videoUpload__Videoform" >
                    <Input className="videoUpload__input" type="file" autoFocus onChange={event => setVideo(event.target.files[0])} />
                    {/* <Input type="file" autoFocus /> */}
                    <Button variant="outlined" type="submit" onClick={videoSubmit}> Upload  <BackupOutlinedIcon /></Button>
                </form>
                {
                    (alert) ? <Alert severity={alertType}>{alertMessage}</Alert> : null
                }

                <h2>Then</h2>

                <form>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        placeholder="Video Title"
                        name="title"
                        autoFocus
                    // value={username}
                    // onChange={event => setUsername(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        placeholder="Video Description"
                        type="text"
                    // value={password}
                    // onChange={event => setPassword(event.target.value)}
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
                    // value={password}
                    // onChange={event => setPassword(event.target.value)}
                    />
                    <Select
                        variant="outlined"
                        fullWidth
                        displayEmpty
                    // value={age}
                    // onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Choose Category</FormHelperText>
                </form>

            </div>
        </Container>


    )
}
