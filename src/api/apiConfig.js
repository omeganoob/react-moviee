const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    myUrl : 'http://127.0.0.1:8000/api/v1/',
    apiKey: '2faf5104594b0a29a0e12867eb94f2c0',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    movieePoster: (imgPath) => `http://127.0.0.1:8000/${imgPath}`
}

export default apiConfig;