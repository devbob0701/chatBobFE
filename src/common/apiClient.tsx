import axios from 'axios';

export const apiClient = {
    post: async (url: string, endpoint: string, data: any) => {
        try {
            const response = await axios.post(`${url}${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error(`POST ${endpoint} failed`, error);
            throw error;
        }
    },

    get: async (url: string, endpoint: string, params: any) => {
        try {
            const response = await axios.get(`${url}${endpoint}`, { params });
            return response.data;
        } catch (error) {
            console.error(`GET ${endpoint} failed`, error);
            throw error;
        }
    }
};