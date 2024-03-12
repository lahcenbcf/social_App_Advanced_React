import {useQuery,useMutation,useQueryClient,useInfiniteQuery} from "@tanstack/react-query"
import { deletePost, deleteSavedPost, fetchPosts, getAllCreators, getCurrentUser, getInfinitePosts, getPostById, likePost, registerUser, savePost, searchPosts, signInAccount, updatePost } from "../appwrite/api"
import { IUpdatedPostprops, User } from "@/types"
import { submittedPost } from "@/types"
import { keys } from "./queryKeys"
import { createPost } from "../appwrite/api"
import { queryClient } from "./QueryProvider"

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn:(user : User)  => registerUser(user),
        onSuccess:()=>queryClient.invalidateQueries({
            queryKey:[keys.GET_USERS]
        })
    })
}

export const useSignInAccount = ()=>{
    return useMutation({
        mutationFn:(user:{
                email:string 
                password:string 
            
        })=> signInAccount(user)
    })
}

export const useCreatePostMutation=()=>{
    return useMutation({
        mutationFn:(post : submittedPost) => createPost(post),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:[keys.GET_RECENT_POSTS]
            })
        }
    })
}


export const useGetRecentPosts=()=>{
    return useQuery({
        queryKey:[keys.GET_RECENT_POSTS],
        queryFn:()=>fetchPosts()
    })
}


export const useLikePost=()=>{
    return useMutation({
        mutationFn:(({postId,likedPosts}:{
            postId:string,
            likedPosts:string[]
        })=>likePost(postId,likedPosts)),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:[keys.GET_POSTS]
            }),
            queryClient.invalidateQueries({
                queryKey:[keys.GET_POST_BY_ID,data?.$id]
            }),
            queryClient.invalidateQueries({
                queryKey:[keys.GET_RECENT_POSTS]
            }),
            queryClient.invalidateQueries({
                queryKey:[keys.GET_CURRENT_USER]
            })
        }
    })
}

export const useSavePost=()=>{
    return useMutation({
        mutationFn:(({userId,postId}:{
            userId:string,
            postId:string
        })=>savePost(postId,userId)),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:[keys.GET_POSTS]
            }),
            queryClient.invalidateQueries({
                queryKey:[keys.GET_RECENT_POSTS]
            }),
            queryClient.invalidateQueries({
                queryKey:[keys.GET_CURRENT_USER]
            })
        }
    })
}

export const useDeleteSavePost=()=>{
    return useMutation({
        mutationFn:(savedPostId:string)=>deleteSavedPost(savedPostId),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:[keys.GET_POSTS]
            }),
            queryClient.invalidateQueries({
                queryKey:[keys.GET_RECENT_POSTS]
            }),
            queryClient.invalidateQueries({
                queryKey:[keys.GET_CURRENT_USER]
            })
        }
    })
}



export const useGetUserInfo=()=>{
    return useQuery({
        queryKey:[keys.GET_CURRENT_USER],
        queryFn:()=>getCurrentUser()
    })
}

export const  useUniquePost=(postId:string)=>{
    return useQuery({
        queryKey:[keys.GET_UNIQUE_POST],
        queryFn:()=>getPostById(postId),
        enabled:!!postId
    })
}

export const useGetUserSaves=(userId:string)=>{
    return useQuery({
        queryKey:[keys.GET_USER_SAVES],
        queryFn:()=>getUserSaves(userId)
    })
}

export const useUpdatePostMutation=()=>{
    return useMutation({
        mutationFn:(post : IUpdatedPostprops)=>updatePost(post),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:[keys.GET_POST_BY_ID,data?.$id]
            })
        }
    })
}

export const deletePostMutation=()=>{
    return useMutation({
        mutationFn:(postId:string,imageId:string)=>deletePost(postId,imageId),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:[keys.GET_POSTS]
            })
        }
    })
}

export const useGetInfinitePost=()=>{
    return useInfiniteQuery({
        queryKey:[keys.GET_INFINITE_POSTS],
        queryFn:getInfinitePosts,
        getNextPageParam:(lastPage)=>{
            if(lastPage && !lastPage.documents.length) return null
            const lastId = lastPage?.documents[lastPage.documents.length - 1].$id
            return lastId
        }
    })
}

export const useSearchPost = (searchTerm:string)=>{
    return useQuery({
        queryKey:[keys.SEARCH_POSTS,searchTerm],
        queryFn:()=>searchPosts(searchTerm),
        enabled:!!searchTerm //automatic refetch when search term changed
    })
}

export const useGetCreators = ()=>{
    return useQuery({
        queryKey:[keys.GET_USERS],
        queryFn:()=>getAllCreators()
    })
}