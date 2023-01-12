import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

const axiosClient2 = axios.create({
    baseURL: apiConfig.myUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})
});

axiosClient2.interceptors.request.use(async (config) => config);

axiosClient2.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient2;