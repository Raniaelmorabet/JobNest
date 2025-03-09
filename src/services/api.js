import axios from 'axios';

const BASE_URL = 'https://your-api-domain.com/api/v1'; // Replace with your API base URL

// Create an Axios instance with default headers
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); // Get the token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API endpoints
export const login = async (email, password) => {
    const response = await api.post('/auth/login/', { email, password });
    return response.data;
};

export const listJobs = async (search = '', page = 1, pageSize = 10) => {
    const response = await api.get('/job/', {
        params: { search, page, page_size: pageSize },
    });
    return response.data;
};

export const getJobDetails = async (jobId) => {
    const response = await api.get(`/job/${jobId}/`);
    return response.data;
};

export const createJob = async (jobData) => {
    const response = await api.post('/job/', jobData);
    return response.data;
};

export const updateJob = async (jobId, jobData) => {
    const response = await api.put(`/job/${jobId}/`, jobData);
    return response.data;
};

export const deleteJob = async (jobId) => {
    const response = await api.delete(`/job/${jobId}/`);
    return response.data;
};

export const applyForJob = async (jobId, applicationData) => {
    const response = await api.post(`/application/`, { job: jobId, ...applicationData });
    return response.data;
};

export const getJobApplicants = async (jobId) => {
    const response = await api.get(`/job/${jobId}/applicants/`);
    return response.data;
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        const response = await api.post('/auth/refresh/', { refresh_token: refreshToken });
        return response.data;
    }
    throw new Error('No refresh token found');
};