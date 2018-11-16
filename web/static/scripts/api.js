//Class for calling the API via HTTP REST
import { getToken } from './token.js';

const BASE_URL = 'http://localhost:8000';

//Method which execute HTTP operations, receives method (get, post, ...), endpoint (consoles, games, ...) and json body
async function callApi(method, endpoint, body) {
    //Obtain token from token.js file method
    const token = getToken();
    //Always JSON content
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    //If token exists we add it to the Authorization header
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const url = `${BASE_URL}${endpoint}`;
    //Asynchronous call
    const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
    });
    return response;
}

//Local method for HTTP GET
export function get(endpoint, body) {
    return callApi('GET', endpoint, body);
}
//Local method for HTTP POST
export function post(endpoint, body) {
    return callApi('POST', endpoint, body);
}
//Local method for HTTP PATCH
export function patch(endpoint, body) {
    return callApi('PATCH', endpoint, body);
}
//Local method for HTTP DELETE. 'delete' is a reserved keyword
export function delet(endpoint, body) {
    return callApi('DELETE', endpoint, body);
}
