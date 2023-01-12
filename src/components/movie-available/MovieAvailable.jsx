import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-available.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';

import movieeApi from '../../api/movieeApi';

import apiConfig from '../../api/apiConfig';

import MovieCardAvailable from '../movie-card-available/MovieCardAvailable';

const MovieAvailable = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await movieeApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.movies || response.results);
        }
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items ? 
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCardAvailable item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                    : null
                }
            </Swiper>
        </div>
    );
}

MovieAvailable.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieAvailable;
