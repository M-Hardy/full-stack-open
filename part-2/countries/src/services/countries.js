import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const all = "api/all";
const specific = "api/name/";

const getAll = () => {
    const request = axios.get(`${baseUrl}/${all}`);
    return request.then((response) => response.data);
};

export default { getAll };
