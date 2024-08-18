import {
  AppRequest,
  SessionResponse,
  TokenRequest,
  User,
  UserRequest,
} from "../types";
import { HttpClient, RestResponse } from "./httpClient";

export type RequestService = Pick<
  RestApplicationClient,
  "getRequests" | "saveRequest"
>;

export type TokenService = Pick<
  RestApplicationClient,
  "getToken" | "removeToken"
>;

export type UserService = Pick<RestApplicationClient, "createUser">;

export class RestApplicationClient {
  constructor(
    private httpClient: HttpClient,
    private token: string | undefined
  ) { }

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

  createUser(userRequest: UserRequest): RestResponse<string> {
    return this.httpClient.request({
      method: "POST",
      url: "/api/users/new",
      data: userRequest,
    });
  }

  getToken(tokenRequest: TokenRequest): RestResponse<SessionResponse> {
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

  getUserByEmail(email: string): RestResponse<User> {
    return this.httpClient.request({
      method: "GET",
      url: `api/users?email=${email}`,
      token: this.token,
    })
  }
}
