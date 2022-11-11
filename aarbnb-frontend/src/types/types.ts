import { RestApplicationClient } from "../services/requestService"

export interface AppRequest {
    subject: string,
    description: string,
    user: string,
    timestamp: number
}

export type RequestService = Pick<RestApplicationClient, "getRequests" | "saveRequest">