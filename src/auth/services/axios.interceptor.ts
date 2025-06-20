import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { serviceURL } from '../../shared/utils/serviceURL';

// Create an Axios instance
const axiosInstance = axios.create({
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setUpAxiosInterceptors = (logout) => {
    axiosInstance.interceptors.request.use(
        async (request) => {
            // You can modify the request config here
            // For example, add an auth token
            // what ever coming request url will have localhost I want to 
            // replace it with env.ipAddress
            let token = '';
            const url = await serviceURL(request.url);
            request.url = url;
            console.log('Request URL:', request.url);
            token = await AsyncStorage.getItem('apiToken') // Get your auth token from the provided function
            const personNumber = '0'; //await AsyncStorage.getItem('personNumber');
            const decoded: any = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                console.log('Token Expired');
                logout();
                return Promise.reject(new Error('Token expired, user logging out...'));
            }
            if (token) {
                request.headers['Authorization'] = `Bearer ${token}`;
                request.headers['personNumber'] = personNumber;
            }

            return request;
        },
        (error) => {
            // Handle request errors here
            return Promise.reject(error);
        }
    );
};

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // You can modify the response data here
        return response;
    },
    (error) => {
        // Handle response errors here
        if (error.response) {
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;

