// src/common/api-client.tsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const apiClient = {
    post: async (endpoint: string, data: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error(`POST ${endpoint} failed`, error);
            throw error;
        }
    },

    get: async (endpoint: string, params: any) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
            return response.data;
        } catch (error) {
            console.error(`GET ${endpoint} failed`, error);
            throw error;
        }
    }
};