import React, { useState } from 'react'
import Sidebar from '../components/sidebar';
import '../assets/css/about.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactMarkdown from 'react-markdown';

export default function About() {

    const [progress, setProgress] = useState(<CircularProgress />);
    const [markdown, setMarkdown] = useState('');

    fetch('https://raw.githubusercontent.com/abhishekraj272/Video-Streaming-Frontend/main/README.md?token=AGO7IBUHQDPV67BDX6WYT3277LOG4')
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
