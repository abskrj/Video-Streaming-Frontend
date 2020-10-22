import React, { Component } from 'react'
import "../assets/css/videoCard.css";

export default class VideoCard extends Component {
    render() {
        return (
            <div className="videoCard">
                <img className="videoTile__thumbnail" src={`https://cdn-firestream.s3.ap-south-1.amazonaws.com/videos/${this.props.videoId}/${this.props.videoId}.jpg`} alt="Thumbnail" />
                <div className="videoCard__info">
                    <img className="videoCard__avtar" src={this.props.userAvtar} alt="avtar" />
                    <div className="videoCard__text">
                        <h4 className="videoCard__videoTitle" >{this.props.videoTitle}</h4>
                        <p className="videoCard__userName" >{this.props.userName}</p>
                        <p>
                            {this.props.views} • {this.props.timestamp}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
