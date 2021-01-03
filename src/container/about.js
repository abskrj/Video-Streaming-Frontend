import React, { useState } from 'react'
import Sidebar from '../components/sidebar';
import '../assets/css/about.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactMarkdown from 'react-markdown';

export default function About() {

    const [progress, setProgress] = useState(<CircularProgress />);
    const [markdown, setMarkdown] = useState('');

    fetch('https://raw.githubusercontent.com/abhishekraj272/Video-Streaming-Backend/master/README.md')
        .then(response => {
            return response.text()
        })
        .then(text => {
            setMarkdown(text);
            setProgress(null);
        });

    return (
        <div className="about__main">
            <Sidebar />

            {progress}

            <div className="about__details">

                <ReactMarkdown>{markdown}</ReactMarkdown>

            </div>
        </div>
    )
}
