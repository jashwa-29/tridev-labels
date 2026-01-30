import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here in the future
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      const { status, config, data } = error.response;
      console.error(`API Error: ${status} - ${config.url}`, data || error.message);
    } else if (error.request) {
      // The request was made but no response was received (Network Error)
      console.error("API Network Error: No response received from server. Is the backend running?", error.message);
    } else {
      // Something happened in setting up the request
      console.error("API Request Error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
