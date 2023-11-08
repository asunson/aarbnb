import { RestApplicationClient } from "../services/requestService"

export interface AppRequest {
    id?: string,
    subject: string,
    description: string,
    user: string,
    timestamp: number
}

export type RequestService = Pick<RestApplicationClient, "getRequests" | "saveRequest">