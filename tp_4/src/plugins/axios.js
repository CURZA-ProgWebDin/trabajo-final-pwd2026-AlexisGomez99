import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:5001/api_v1',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})