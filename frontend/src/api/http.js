import Axios from "axios";
import baseUrl from './baseUrl';
import Qs from 'qs';

Axios.defaults.xsrfCookieName = "CSRF-TOKEN";
Axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
Axios.defaults.withCredentials = true;

export function http(options) {
    return Axios({
        method: options.method,
        data: options.data,
        params: options.params,
        url: `${baseUrl}${options.url}`,
        paramsSerializer: function(params) {
            return Qs.stringify(params, {
                arrayFormat: 'brackets'
            })
        },
    })
}