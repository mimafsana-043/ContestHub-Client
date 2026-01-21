import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    // You can add other default configurations here
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;