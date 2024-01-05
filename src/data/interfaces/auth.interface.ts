export interface AuthUser {
  id: string;
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
