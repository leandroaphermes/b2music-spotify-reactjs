import axios from "axios"

import { getUser, deleteUser } from '../utils/utils'

const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    const user = getUser()
    if(user.token){
        config.headers.Authorization = `Bearer ${user.token} `
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
    }, function (error) {
        
        if(error.response.status === 401){
            deleteUser()
        }

    return Promise.reject(error);
    }
);


export default api