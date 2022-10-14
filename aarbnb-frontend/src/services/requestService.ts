import { AppRequest } from "../types/types";
import { HttpClient, RestResponse } from "./httpClient";

export class RestApplicationClient {
    constructor(private httpClient: HttpClient) {
    }

    getRequests(): RestResponse<AppRequest[]> {
        return this.httpClient.request({method: "GET", url: "/api/requests"})
    }

    saveRequest(appRequest: AppRequest): RestResponse<string> {
        return this.httpClient.request({method: "POST", url: "/api/requests", data: appRequest})
    }
}