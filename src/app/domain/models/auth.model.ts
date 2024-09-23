export interface Auth {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface TokenResponse {
  iat: number;
  sub: number;
  user: string;
}
