import axios from "axios"
import apiUrl from "./api.json"

// TODO: change api baseURL

// const baseURL = 'http://triple-c-api.algorithm.am';
const baseURL = apiUrl.apiUrl
// const baseURL = 'http://triplebe.loc/';

export default axios.create({
  baseURL,
  headers: {
    // Content-Type: 'application/x-www-form-urlencoded',
    Accept: "application/json",
    // responseType: "blob"
  },
})
