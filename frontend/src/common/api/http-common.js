import baseAxios from 'axios';

const axios = baseAxios.create({
  // baseURL: 'https://j7e206.p.ssafy.io/api/v1',
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST',
    // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    'Content-Type': 'application/json',
  },
});


export default axios;

