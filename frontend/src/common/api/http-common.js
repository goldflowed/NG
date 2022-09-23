import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
// const axios = baseAxios.create({
//   baseURL: 'http://localhost:8080/api/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const openvidu = baseAxios.create({
//   baseURL: 'https://i7e103.p.ssafy.io:8082/',
//   headers: 'SMND';
// })


export default axios;
