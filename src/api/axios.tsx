import axios from "axios";
const BASE_URL = "http://universities.hipolabs.com/";

// CREATED CUSTOM AXIOS INTERFACE
// HERE WE COULD HANDLE HEADERS OBJECT AND OTHER CONFIGS AS WELL

export default axios.create({
  baseURL: BASE_URL,
});
