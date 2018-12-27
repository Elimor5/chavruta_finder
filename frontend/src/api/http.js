import Axios from "axios";
import baseUrl from './baseUrl';

export function http(options) {
    return Axios({
        method: options.method,
        data: options.params, 
        url: `${baseUrl}${options.url}`
    })
}