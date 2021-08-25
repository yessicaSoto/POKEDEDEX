axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    $("#loader").css('display', 'block');
    return config;
}, function (error) {
    $("#loader").css('display', 'none');
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    $("#loader").css('display', 'none');
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    $("#loader").css('display', 'none');
    return Promise.reject(error);
});
