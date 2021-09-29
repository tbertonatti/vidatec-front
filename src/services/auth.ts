const token_location = "user_token";

export const SetToken = (token: string): void =>
  localStorage.setItem(token_location, token);

export const GetToken = (): string =>
  String(localStorage.getItem(token_location));
