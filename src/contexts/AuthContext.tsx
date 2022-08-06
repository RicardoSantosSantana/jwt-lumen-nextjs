import Router from 'next/router'
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies , destroyCookie } from 'nookies'
import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";
import jwt from 'jsonwebtoken';

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  setUser: (user)=>void;
  user: User;
  signIn: (data: SignInData) => Promise<void> ;  
  logout:()=>void; 
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {

  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
 
  useEffect(() => {
     
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_API_AUTH  
    const token = parseCookies()[cookieName]
    
    console.log("TOKEN: ",token)

    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, async function  (err, decoded) {
      console.log("ERRO EM AuthContext : ", err)
      if (err) { 
        Router.push('/');
        return {}
      }
      recoverUserInformation(decoded.sub).then(response => {  
        console.log("response em recoverUserInformation : ", response)

        if(response){       
          setUser(response)
          setIsAuthenticated(true)           
        }else{
          Router.push('/');
        }

      })     


    });
  
   
  }, [])

   function logout():void {
    setUser(null)
    destroyCookie(undefined, process.env.NEXT_PUBLIC_COOKIE_API_AUTH)
    Router.push('/');
  }

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    })

    console.log("token",token)
    console.log("user",user)

    setCookie(undefined, process.env.NEXT_PUBLIC_COOKIE_API_AUTH, token, {
      maxAge: 60 * 60 * 60 *60 , // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user)

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn,logout }}>
      {children}
    </AuthContext.Provider>
  )
}