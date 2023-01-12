import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';

import Film from './Film';
import movieeApi from '../../api/movieeApi';
import apiConfig from '../../api/apiConfig';
import './detail.scss';

const DetailAvailable = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await movieeApi.detail(category, id, {params:{}});
            setItem(response.movie);
            console.log(item);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.movieePoster(item.poster)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.movieePoster(item.poster)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.description}</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <Film url={item.fileUrl}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default DetailAvailable;
