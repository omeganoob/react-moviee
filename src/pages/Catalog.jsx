import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';
import MovieGridAvailable from '../components/movie-grid-available/MovieGridAvailable';

const Catalog = () => {

    const { category } = useParams();

    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : (category === cate.tv ? 'TV Series' : 'Available')}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    {
                        category === cate.available ?<MovieGridAvailable category={category} /> : <MovieGrid category={category}/>
                    }
                </div>
            </div>
        </>
    );
}

export default Catalog;
