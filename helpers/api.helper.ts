import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

function getStandardHeaders() {
    const headers = {
        Authorization: `Bearer ${process.env.TOKEN}`,
    };
    return headers;
}

async function request(config: AxiosRequestConfig) {
    let response!: AxiosResponse<any>;
    let error!: AxiosError;

    if (!config.baseURL)
        config.baseURL = process.env.BASE_URL;

    if (!config.responseType)
        config.responseType = 'json';

    await axios.request(config)
        .then((res: AxiosResponse<any>) => {
            response = res;
        })
        .catch((err: AxiosError) => {
            error = err;
        });
    
    return { response: response, error: error };
}

export { getStandardHeaders, request };