import React, { useEffect, useState } from 'react'
import "../assets/css/body.css"
import VideoCard from "./videoCard";
import Alert from '@material-ui/lab/Alert';

export default function Body({ pageTitle }) {

    const [videos, setVideos] = useState([]);
    const [alert, setAlert] = useState(null);

    let accessToken = localStorage.getItem('accessToken', null);

    useEffect(() => {

        let urlVar;

        if (pageTitle === "Liked Videos") {
            if (!accessToken) {
                setAlert(<Alert severity="error">Please login</Alert>);
                return;
            }
            urlVar = 'https://api.codedoc.tech/api/list/mylikes';
        }
        else if (pageTitle === "My Videos") {
            if (!accessToken) {
                setAlert(<Alert severity="error">Please login</Alert>);
                return;
            }
            urlVar = 'https://api.codedoc.tech/api/list/myvideos';
        }

        else {
            urlVar = 'https://api.codedoc.tech/api/list/videos';
        }
        setAlert(<Alert severity="info">Loading......</Alert>);


        const requestOptions = {
            method: 'GET',
            headers: { 'Accept-Encoding': 'gzip, deflate', 'x-access-token': accessToken },
        };

        fetch(urlVar, requestOptions)
            .then(response => response.json())
            .then(jsondata => {
                localStorage.setItem('videos', JSON.stringify(jsondata));
                setVideos(jsondata);
                setAlert(null);
            })

    }, [pageTitle])

    return (
        <div className="body__main">
            <h2>{pageTitle}</h2>
            <div className="body__video">

                {alert}

                {
                    videos.map(data => {
                        let dateUploaded = new Date(data.createdAt);
                        let todaysDate = new Date();

                        return (
                            <VideoCard
                                key={data.videoId}
                                userAvtar={data.owner.avtarUrl}
                                videoId={data.videoId}
                                videoTitle={data.title}
                                userName={data.owner.name}
                                views={`${data.views} views`}
                                timestamp={`${Math.ceil((todaysDate - dateUploaded) / 8.64e7)} days ago`}
                                tags={data.tags}
                                category={data.category}
                                description={data.description}
                            />
                        )
                    })

                }

            </div>

        </div>
    )
}
