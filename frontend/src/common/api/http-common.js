import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: 'https://j7e206.p.ssafy.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axios;

