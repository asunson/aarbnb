// interface HttpClient {
//     request(requestConfig: { method: string; url: string; queryParams?: any; data?: any; }): RestResponse<any>;
// }

import axios from "axios";

export type RestResponse<R> = Promise<R>;

export class HttpClient {
    constructor() {
    }

    request(requestConfig: { method: string; url: string; queryParams?: any; data?: any; }): RestResponse<any> {
        return resolveOrRejectPromise(axios({
            method: requestConfig.method,
            url: requestConfig.url,
            data: requestConfig.data
        }))
    }
}

const resolveOrRejectPromise = (request: RestResponse<any>): RestResponse<any> => {
    return request
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                return response.data
            }
            else {
                return Promise.reject({
                    status: response.status,
                    data: response.data
                })
            }                
        }) 
}