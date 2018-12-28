import Axios from "axios";
import baseUrl from './baseUrl';

Axios.defaults.withCredentials = true;

export function http(options) {
    return Axios({
        method: options.method,
        data: options.params, 
        url: `${baseUrl}${options.url}`
    })
}