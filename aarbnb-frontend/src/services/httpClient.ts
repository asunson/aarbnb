// interface HttpClient {
//     request(requestConfig: { method: string; url: string; queryParams?: any; data?: any; }): RestResponse<any>;
// }

import axios, { AxiosRequestConfig } from "axios";

export type RestResponse<R> = Promise<R>;

export class HttpClient {
  request(requestConfig: {
    method: string;
    url: string;
    queryParams?: any;
    data?: any;
    token?: string;
  }): RestResponse<any> {
    const axiosPayload: AxiosRequestConfig = {
      method: requestConfig.method,
      url: requestConfig.url,
      data: requestConfig.data,
    };

    if (requestConfig.token) {
      axiosPayload["headers"] = {
        Authorization: "Bearer " + requestConfig.token,
      };
    }

    return resolveOrRejectPromise(axios(axiosPayload));
  }
}

const resolveOrRejectPromise = (
  request: RestResponse<any>
): RestResponse<any> => {
  return request.then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      return Promise.reject({
        status: response.status,
        data: response.data,
      });
    }
  });
};
