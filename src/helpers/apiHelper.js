import axios from 'axios';

const baseURL = 'http://triple-c-api.algorithm.am';

const apiHelper = axios.create({
  baseURL,
  headers: {
    // Content-Type: 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    // responseType: "blob"
  },
});

export { apiHelper };
