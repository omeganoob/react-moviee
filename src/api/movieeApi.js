import axiosClient2 from "./axiosClient2";

const movieeApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/';
        return axiosClient2.get(url, params);
    },
    search: (cate, params) => {
        const url = `movie/search?key=${params.params.query}`;
        console.log(url)
        return axiosClient2.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = `movie/${id}`;
        console.log(url);
        return axiosClient2.get(url, params);
    }
}

export default movieeApi;