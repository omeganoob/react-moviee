import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid-available.scss';

import MovieCardAvailable from '../movie-card-available/MovieCardAvailable';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import movieeApi from '../../api/movieeApi';

const MovieGridAvailable = props => {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch(props.category) {
                    case category.available:
                        response = await movieeApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params});
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await movieeApi.search(props.category, {params});
            }
            setItems(response.movies);
        }
        getList();
    }, [props.category, keyword]);

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className="movie-grid">
                {
                    items ? items.map((item, i) => <MovieCardAvailable category={props.category} item={item} key={i}/>) : null
                }
            </div>
        </>
    );
}

const MovieSearch = props => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGridAvailable;
