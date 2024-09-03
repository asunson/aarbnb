export interface Booking {
  id: string;
  userId: string;
  startDate: string; // dateisostring
  endDate: string; // dateisostring
  status: string;
  createdAt: number;
}

export interface BookingRequest {
  userId: string;
  startDate: string; // dateisostring
  startTime: string;
  endDate: string; // dateisostring
  endTime: string;
}

export enum BookingStatus {
  REQUESTED = "Requested",
  APPROVED = "Approved",
}

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

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  isHost: boolean;
}

export type UserRequest = Omit<User, "id"> & { password: string; code: string };
export interface SessionResponse extends ApiSuccessResponse {
  token: string;
  user: User | null;
}

export interface ApiSuccessResponse {
  success: boolean;
}

export interface InputProps<T> {
  value: T;
  onChange: (newValue: T) => void;
}
