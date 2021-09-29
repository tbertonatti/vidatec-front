import { HttpPost } from "./http";
const baseUrl = "/auth";

type TokenResponse = {
  access_token: string;
};
export const Login = (
  username: string,
  password: string
): Promise<TokenResponse> =>
  HttpPost(`${baseUrl}/login`, { username, password });
