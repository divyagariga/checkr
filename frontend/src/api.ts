import axios from 'axios';
import { BASE_URL } from './config/url';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-Type': 'application/json',
  },
});

export default api;
