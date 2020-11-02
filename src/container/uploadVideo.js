import { Container, Typography, CssBaseline, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import React, { useState } from 'react'
import "../assets/css/upload.css";
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';

export default function UploadVideo() {

    const [video, setVideo] = useState(null);

    const videoSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(form.current)
        fetch('/api', {
            method: 'POST',
            headers: new Headers({
                'AuthHeader': '123',
                // STOP! Do not add the following header!
                // 'Content-Type': 'multipart/form-data'
            }),
            body: data,
        })
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
                        {/* <Input type="file" autoFocus onChange={event => setVideo(event.target.files[0])} /> */}
                        <Input type="file" autoFocus />
                        <Button type="submit" onClick={videoSubmit}> Upload  <BackupOutlinedIcon /></Button>
                    </FormControl>
                </form>
            </div>
        </Container>
    )
}
