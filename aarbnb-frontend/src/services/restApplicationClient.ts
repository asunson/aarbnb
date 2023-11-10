import { AppRequest, TokenRequest, TokenResponse } from "../types";
import { HttpClient, RestResponse } from "./httpClient";

export class RestApplicationClient {
  constructor(
    private httpClient: HttpClient,
    private token: string | undefined
  ) {}

  getRequests(): RestResponse<AppRequest[]> {
    return this.httpClient.request({
      method: "GET",
      url: "/api/requests",
      token: this.token,
    });
  }

  saveRequest(appRequest: AppRequest): RestResponse<string> {
    return this.httpClient.request({
      method: "POST",
      url: "/api/requests",
      data: appRequest,
      token: this.token,
    });
  }

  getToken(tokenRequest: TokenRequest): RestResponse<TokenResponse> {
    return this.httpClient.request({
      method: "POST",
      url: "/api/token",
      data: tokenRequest,
    });
  }

  removeToken(): RestResponse<void> {
    return this.httpClient.request({
      method: "POST",
      url: "api/logout",
    });
  }
}
