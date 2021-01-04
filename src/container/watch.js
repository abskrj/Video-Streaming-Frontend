import React, { useState, useEffect, useRef } from 'react';
import "../assets/css/watch.css";
import { Replay } from 'vimond-replay';
import 'vimond-replay/index.css';
import ShakaVideoStreamer from 'vimond-replay/video-streamer/shaka-player';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const VideoPlayerConfig = {
    interactionDetector: {
        inactivityDelay: 2
    },
    keyboardShortcuts: {
        keyMap: {
            togglePause: [' ', 'Enter', 'P'],
            toggleFullscreen: 'F',
            decreaseVolume: ['-', 'down'],
            increaseVolume: ['+', 'up'],
            skipBack: [',', 'left'],
            skipForward: ['.', 'right'],
            toggleUserActive: 'C',
            toggleMute: 'M'
        }
    },
    userSettings: {
        hasPrecedence: false,
        storageKey: 'replay-settings',
        settingsStoragePolicy: {
            volume: 'local',
            isMuted: 'local'
        }
    },
    responsivenessRules: [{
        className: 'narrow',
        width: {
            max: 320
        }
    }, {
        className: 'medium-width',
        width: {
            min: 640,
            max: 500
        }
    }, {
        className: 'wide',
        width: {
            max: 700
        }
    }],
    controls: {
        skipButtonOffset: -10,
        qualitySelectionStrategy: 'cap-bitrate',
        liveDisplayMode: 'clock-time'
    }
};

export default function Watch() {

    const query = new URLSearchParams(window.location.search);

    const videoId = query.get('v');

    const [video, setVideo] = useState({ title: 'Loading', views: 'Loading', createdAt: 'Loading', _id: 'Loading', tags: 'Loading' });

    const history = useHistory();

    let accessToken = localStorage.getItem('accessToken') || null;

    if (!accessToken) {
        history.push(`/login`);
    }

    console.log('fired');

    useEffect(() => {


        let videoMetaData = localStorage.getItem('videos') || null;

        videoMetaData = JSON.parse(videoMetaData);

        if (!videoMetaData) {
            const requestOptions = {
                method: 'GET',
                headers: { 'x-access-token': accessToken },
            };

            fetch(`https://api.codedoc.tech/api/list/this?vId=${videoId}`, requestOptions)
                .then(response => response.json())
                .then(jsondata => {
                    videoMetaData = jsondata;
                })

        }

        videoMetaData.map(data => {
            if (data.videoId === videoId) {

                let tagConcat = "";
                data.tags.map(tag => {
                    tagConcat = tagConcat + tag;
                })
                data.tags = tagConcat;

                let dateUploaded = new Date(data.createdAt);
                let todaysDate = new Date();

                data.createdAt = Math.ceil((todaysDate - dateUploaded) / 8.64e7);

                const requestOptions = {
                    method: 'GET',
                    headers: { 'x-access-token': accessToken },
                };

                fetch(`https://api.codedoc.tech/api/video/view/${data._id}`, requestOptions);

                setVideo(data);
            }
        })
    }, [])

    const likeBtn = useRef();
    const dislikeBtn = useRef();

    const videoLike = (e) => {
        e.preventDefault();
        e.target.style.color = 'blue';
        dislikeBtn.current.style.color = 'black';

        const requestOptions = {
            method: 'GET',
            headers: { 'x-access-token': accessToken },
        };

        fetch(`https://api.codedoc.tech/api/video/like/${video._id}`, requestOptions);
    }

    const videoDislike = (e) => {
        e.preventDefault();
        e.target.style.color = 'blue';
        likeBtn.current.style.color = 'black';

        const requestOptions = {
            method: 'GET',
            headers: { 'x-access-token': accessToken },
        };

        fetch(`https://api.codedoc.tech/api/video/dislike/${video._id}`, requestOptions);
    }

    return (
        <div className="watchVideo__main">
            <div className="watchVideo__main">
                <Replay className="player" options={VideoPlayerConfig} source={video.videoUrl} initialPlaybackProps={{ isPaused: true }}>
                    <ShakaVideoStreamer className="watchVideo__shaka" />
                </Replay>
            </div>
            <div className="watchVideo__details">
                <div>
                    <p className="watchVideo__tags">{video.tags}</p>
                    <h2>{video.title}</h2>
                    <div className="watchVideo__stats">
                        <p>
                            {video.views} Views
                            </p>
                        <p>
                            •
                            </p>

                        <p>
                            {video.createdAt} days ago
                            </p>
                    </div>
                </div>

                <div>
                    <Button onClick={videoLike}>
                        <ThumbUpAltOutlinedIcon ref={likeBtn} />
                    </Button>

                    <Button onClick={videoDislike}>
                        <ThumbDownAltOutlinedIcon ref={dislikeBtn} />
                    </Button>

                    <Button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied") }}>
                        <ShareOutlinedIcon />
                    </Button>
                </div>
            </div>

            <hr />

            <div className="watchVideo__desc">
                <p>{video.description}</p>
            </div>
        </div>
    )
}
