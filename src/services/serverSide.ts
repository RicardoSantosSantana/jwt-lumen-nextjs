import jwt from 'jsonwebtoken';
import { parseCookies } from "nookies";
import { logOut } from "./api";
import { getAPIClient } from './axios';

export default async function apiServerSide(ctx){

  const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH  
  const token = parseCookies(ctx)[cookieName]

  if (!token) {
    return logOut(ctx)
  }

  const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, function (err, decoded) {

    if (err) {
      return logOut(ctx)
    }

    return decoded;
  });
 
  const user_id = decoded.sub;

  const apiClient = getAPIClient(ctx);
  const apiResponse = await apiClient.get(`/api/profile/${user_id}`)

  if (apiResponse.status != 200) {
    return logOut(ctx)
  }

  return { props: apiResponse.data };


}