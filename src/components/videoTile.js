import React, { Component } from 'react'
import "../assets/css/videoTile.css"

export default class VideoTile extends Component {
    render() {
        return (
            <div className="videoTile">

                <div className="videoTile__main">
                    <img className="videoTile__thumbnail" src={`https://cdn-firestream.s3.ap-south-1.amazonaws.com/videos/${this.props.videoId}/${this.props.videoId}.jpg`} alt="Thumbnail" />
                    <div className="videoTile__info">
                        <h3 className="videoTile__videoTitle" >{this.props.videoTitle}</h3>
                        <p className="videoTile__meta">
                            {this.props.views} • {this.props.timestamp}
                        </p>
                        <div className="videoTile__detail">
                            <img className="videoTile__avtar" src={this.props.userAvtar} alt="avtar" />
                            <p className="videoTile__userName" >{this.props.userName}</p>

                        </div>
                        <p className="videoTile__description">{this.props.description}</p>
                    </div>
                </div>


            </div>
        )
    }
}
