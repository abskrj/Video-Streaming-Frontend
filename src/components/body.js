import React, { useEffect, useState } from 'react'
import "../assets/css/body.css"
import VideoCard from "./videoCard";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const isCached = () => {
    return localStorage.getItem('videos') || null;
}

export default function Body({ pageTitle }) {

    const [videos, setVideos] = useState([]);
    const [alert, setAlert] = useState(null);
    const [progress, setProgress] = useState(null);

    let accessToken = localStorage.getItem('accessToken', null);

    useEffect(() => {

        let urlVar;
        let pageType;

        if (window.location.pathname === "/likes") {
            if (!accessToken) {
                setAlert(<Alert severity="error">Please login</Alert>);
                return;
            }
            urlVar = 'https://api.firestreamz.co/api/list/mylikes';
            pageType = 'likedvideos';
        }
        else if (window.location.pathname === "/myvideos") {
            if (!accessToken) {
                setAlert(<Alert severity="error">Please login</Alert>);
                return;
            }
            urlVar = 'https://api.firestreamz.co/api/list/myvideos';
            pageType = 'myvideos';
        }

        else {
            urlVar = 'https://api.firestreamz.co/api/list/videos';
            pageType = 'videos';
        }
        setProgress(<CircularProgress />);

        const requestOptions = {
            method: 'GET',
            headers: { 'Accept-Encoding': 'gzip, deflate', 'x-access-token': accessToken },
        };

        fetch(urlVar, requestOptions)
            .then(response => response.json())
            .then(jsondata => {
                localStorage.setItem(pageType, JSON.stringify(jsondata));
                setVideos(jsondata);
                setAlert(null);
                setProgress(null);
            });

    }, [pageTitle])

    return (
        <div className="body__main">

            <div className="body__title">
                <h2>{pageTitle}</h2>
                {
                    progress
                }
            </div>

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
