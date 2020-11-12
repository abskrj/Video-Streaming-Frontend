import React, { Component } from 'react';
import "../assets/css/watch.css";
import { Replay } from 'vimond-replay';
import 'vimond-replay/index.css';
import ShakaVideoStreamer from 'vimond-replay/video-streamer/shaka-player';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { Button } from '@material-ui/core';

export default class Watch extends Component {

    constructor(props) {

        super(props);

        this.state = {
            video: {
                src: "https://cdn-firestream.s3.ap-south-1.amazonaws.com/videos/vDIT7VC/vDIT7VC.mpd",
                poster: "https://cdn-firestream.s3.ap-south-1.amazonaws.com/videos/vDIT7VC/vDIT7VC.jpg"
            }
        }
    }

    // componentDidUpdate() {
    //     const url = "https://cdn-firestream.s3.ap-south-1.amazonaws.com/videos/vDIT7VC/vDIT7VC.mpd";
    //     const video = this.player;
    //     const dashjs = dashjs.MediaPlayer().create();
    //     dashjs.initialize(video, url, true);
    // }

    render() {
        const VideoPlayerConfig = {
            interactionDetector: {
                inactivityDelay: 2
            },
            keyboardShortcuts: {
                keyMap: {
                    togglePause: [' ', 'Enter', 'P'],
                    toggleFullscreen: 'F',
                    decreaseVolume: '-',
                    increaseVolume: '+',
                    skipBack: ',',
                    skipForward: '.',
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
        return (
            <div className="watchVideo__main">
                <div className="watchVideo__main" ref={this.videoContainer}>
                    <Replay className="player" options={VideoPlayerConfig} source="https://cdn-firestream.s3.ap-south-1.amazonaws.com/videos/vDIT7VC/vDIT7VC.mpd" initialPlaybackProps={{ isPaused: true }}>
                        <ShakaVideoStreamer className="watchVideo__shaka" />
                    </Replay>
                </div>
                <div className="watchVideo__details">
                    <div>
                        <p>#tag1 #tag2</p>
                        <h2>Video Title</h2>
                        <div className="watchVideo__stats">
                            <p>
                                150M Views
                            </p>
                            <p>
                                •
                            </p>

                            <p>
                                5 days ago
                            </p>
                        </div>
                    </div>

                    <div>
                        <Button>
                            <ThumbUpAltOutlinedIcon />
                        </Button>

                        <Button>
                            <ThumbDownAltOutlinedIcon />
                        </Button>

                        <Button>
                            <ShareOutlinedIcon />
                        </Button>
                    </div>
                </div>

                <hr />

                <div className="watchVideo__desc">
                    <p>Video Description</p>
                </div>
            </div>
        )
    }
}
