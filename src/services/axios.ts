import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {

  const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH  
  const token = parseCookies(ctx)[cookieName] 

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  api.interceptors.response.use(response => {
    return response;
  }, error => error
  );

  return api;
}