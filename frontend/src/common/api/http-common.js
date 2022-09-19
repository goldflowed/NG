import baseAxios from 'axios';

const axios = baseAxios.create({
    baseURL: 'http://localhost8080/api',
    headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;