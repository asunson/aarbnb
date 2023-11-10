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

export interface UserRequest {
  id?: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  isHost: boolean;
}

export interface TokenResponse extends ApiSuccessResponse {
  token: string;
}

export interface ApiSuccessResponse {
  success: boolean;
}

export interface InputProps<T> {
  value: T;
  onChange: (newValue: T) => void;
}
