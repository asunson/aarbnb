import { RestApplicationClient } from "../services/restApplicationClient";

export interface AppRequest {
  id?: string;
  subject: string;
  description: string;
  user: string;
  timestamp: number;
}

export interface TokenRequest {
  email: string;
  password: string;
}

export interface TokenResponse extends ApiSuccessResponse {
  token: string;
}

export interface ApiSuccessResponse {
  success: boolean;
}

export type RequestService = Pick<
  RestApplicationClient,
  "getRequests" | "saveRequest"
>;
export type TokenService = Pick<
  RestApplicationClient,
  "getToken" | "removeToken"
>;
