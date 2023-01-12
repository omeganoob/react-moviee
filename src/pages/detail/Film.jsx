import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';


const Film = props => {

    const {category} = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            setVideos(props.url);
        }
        getVideos();
    }, [category, props.url]);

    return (
        <>
            {
                <Video url={videos}/>
            }
        </>
    );
}

const Video = props => {

    const url = props.url;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <iframe
                src={url}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}

export default Film;
