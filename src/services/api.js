import axios from "axios"
import { getSessionToken, deleteSessionToken } from '../utils/utils'

const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})









// Add a request interceptor
api.interceptors.request.use(function (config) {
    
    const token = getSessionToken()
    if(token !== ""){
        config.headers.Authorization = `Bearer ${token} `
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
    }, function (error) {
        if(!error.response || error.response.status === 401){
            deleteSessionToken()
        }

    return Promise.reject(error);
    }
);


export default api