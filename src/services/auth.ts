import axios from "axios";
import jwt from 'jsonwebtoken';
//import { v4 as uuid } from 'uuid'
type SignInRequestData = {
  email: string;
  password: string;
}
import { api } from './api';
 
export async function signInRequest(data: SignInRequestData) {
  //await delay()
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
  })

  return await api.post('/api/login', data)
    .then(function (response) {
      return response.data?.access_token
    })
    .catch(function (error) {
      console.error(error);
    });

}

export async function recoverUserInformation(user_id: any) {
   
 const urlProfile = `/api/profile/${user_id}`
 console.log(urlProfile)
      return await api.get(urlProfile).then(
        response => {
          console.log("dentro de recoverUserInformation ", response.data)
          return response.data

        }
        )

}