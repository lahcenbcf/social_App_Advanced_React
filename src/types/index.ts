import { Models } from "appwrite"

export type User = {
    email:string 
    username : string 
    password : string
}

export interface UserSession{
    email:string 
    username:string 
    bio:string 
    imageUrl:string
    id:string
}

export interface IAuthContext {
    user:UserSession,
    setUser:React.Dispatch<React.SetStateAction<UserSession>>
    isAuthenticated:boolean
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
    loading:boolean
    checkAuthUser:()=>Promise<boolean>
    logout:()=>void
}

export interface IPostprops{
    caption : string
    tags:string 
    postImage:File[]
    location:string
}

export interface IUpdatedPostprops{
    caption : string
    tags:string 
    postImage:File[]
    location:string
    imageId:string 
    imageUrl:URL
    id:string
    creator:string 
}

export type submittedPost = {
    caption:string 
    tags:string 
    location:string 
    creator:string 
    postImage: File[]
}