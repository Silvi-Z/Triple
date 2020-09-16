import axios from 'axios';

// const baseURL = 'http://triple-c-api.algorithm.am';
const baseURL = 'http://triplebe.loc/';

const apiHelper = axios.create({
  baseURL,
  headers: {
    // Content-Type: 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    // responseType: "blob"
  },
});

export { apiHelper };
