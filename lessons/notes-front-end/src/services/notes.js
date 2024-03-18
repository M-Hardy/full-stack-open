import axios from "axios";

// Kept unchanged to show that react app can still
// run independently from node/express web server;
// Node/express server is just configured to serve
// copy of react app dist as its front end (for any
// GET request it will first check if dist directory
// contains a file corresponding to the request's
// address)

// Relative path used for node/express copy:
const baseUrl = "api/notes";
// Use absolute path to see that react app still
// works by itself
// const baseUrl = "http://localhost:3001/api/notes";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

export default {
    getAll,
    create,
    update,
};
