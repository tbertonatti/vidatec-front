import paths from "../routers/paths";
import { GetToken } from "./auth";

const server = "/api";
const HandledFetch = async (url: string, data: RequestInit = {}) => {
  const auth = GetToken();
  const authObj = { Authorization: "Bearer " + auth };
  data.headers = data.headers ? { ...data.headers, ...authObj } : authObj;
  try {
    const response = await fetch(url, data);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } else {
      throw Error(String(response.status));
    }
  } catch (err: any) {
    if (err.toString().includes("Error: 502")) {
      throw Error("Server is down");
    } else if (err.toString().includes("Error: 401")) {
      const currentLocation = window.location.href;
      const currentLayout = currentLocation.substr(
        currentLocation.lastIndexOf("/")
      );
      if (currentLayout !== paths.login) {
        window.location.href = paths.login;
      }
      throw err;
    } else {
      throw err;
    }
  }
};
export const HttpGet = (url: string) => {
  return HandledFetch(server + url);
};
export const HttpDelete = (url: string) => {
  return HandledFetch(server + url, { method: "DELETE" });
};
export const HttpPost = (url: string, data: any) => {
  return HandledFetch(server + url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const HttpPut = (url: string, data: any = {}) => {
  return HandledFetch(server + url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
