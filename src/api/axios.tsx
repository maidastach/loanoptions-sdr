import axios from "axios";
const BASE_URL = "http://universities.hipolabs.com/";

export default axios.create({
  baseURL: BASE_URL,
});
