import { getCurrentUser } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";
import { IAuthContext } from "@/types";
import { createContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";


export const INITIAL_USER={
    id:"",
    username:"",
    email:"",
    imageUrl:"",
    bio:""
}


const INITIAL_STATE={
    user:INITIAL_USER,
    loading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async()=>false as boolean,
    logout:async()=>null
}

export const authContext = createContext<IAuthContext>(INITIAL_STATE)

export const AuthProvider=({children}:{
    children:React.ReactNode
})=>{
    const [user,setUser]=useState(INITIAL_USER)
    const navigate = useNavigate()
const [loading,setLoading]=useState(false)
const [isAuthenticated,setIsAuthenticated]=useState(false)
const checkAuthUser=async()=>{
    try {
        const currentUser = await getCurrentUser()
        if(currentUser){
            setUser({
                email:currentUser.email!,
                username:currentUser.username!,
                imageUrl:currentUser.imageUrl,
                id:currentUser?.$id,
                bio:currentUser?.bio
            })
            setIsAuthenticated(true)
            return true
        }

        return false
    } catch (error) {
        return false
    }finally{
        setLoading(false)
    }
}

async function logout() {
    await account.deleteSession("current");
    setUser(null!);
  }

  async function init() {
    try {
      await checkAuthUser()
    } catch (err) {
      setUser(null!);
    }
  }
const value={
    user,
    setUser,
    loading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    logout
}


useEffect(()=>{
    init()
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    )  navigate("/login")
},[])
    return(
    <authContext.Provider value={value}>{children}</authContext.Provider> 
    )
}