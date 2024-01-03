import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id: string;
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: string;
  iss: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
};

export function parseJwt(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
}
