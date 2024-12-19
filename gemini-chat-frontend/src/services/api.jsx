import axios from 'axios';

//const API_URL = 'http://localhost:8080/api/qna/ask';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/ask`;

// Log the API_URL to verify the correct value
console.log('Using API URL:', API_URL);

export const fetchChatResponse = async (question) => {
    try {
        const response = await axios.post(API_URL, { question });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
