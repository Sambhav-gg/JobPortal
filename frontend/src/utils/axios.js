import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;