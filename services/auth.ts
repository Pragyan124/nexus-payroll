import axios from 'axios';
import { UserRole } from '../types';

const API_URL = 'http://localhost:8080/api/auth';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        
        // Save token to LocalStorage for future requests
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};