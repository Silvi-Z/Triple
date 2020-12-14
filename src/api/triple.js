import axios from 'axios';

// TODO: change api baseURL

// const baseURL = 'http://triple-c-api.algorithm.am';
// const baseURL = 'http://api.triple-c.develop';
const baseURL = 'http://triplebe.loc/';

export default axios.create({
  baseURL,
  headers: {
    // Content-Type: 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    // responseType: "blob"
  },
});
