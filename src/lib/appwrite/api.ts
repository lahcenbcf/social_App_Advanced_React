import { IUpdatedPostprops, User, submittedPost } from '@/types';
import { account, appWriteConfig, avatars, databases, storage } from './config';
import { ID, Query} from 'appwrite';
import { URL } from 'url';

export const registerUser = async (user: User) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );
    //save user in DB
    if (!newAccount) {
      throw new Error('Unknwon error');
    }
    const avatarUrl = avatars.getInitials(user.username);
    const newUser = await saveUserToDB({
      username: user.username,
      email: newAccount.email,
      password: user.password!,
      accountId: newAccount.$id,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error: any) {
    return error.message;
  }
};

interface UserDB extends User {
  accountId: string;
  imageUrl: URL;
}

export const saveUserToDB = async (user: UserDB) => {
  try {
    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error: any) {
    return error.message;
  }
};


export const signInAccount =async(user:{
    email:string,
    password:string
   
})=>{
try {
    const session = await account.createEmailPasswordSession(user.email,user.password)
    return session
} catch (error) {
    console.log(error)
    return false
}
}

export const getCurrentUser : any =async()=>{
  try {
    let user = await account.get()
    if(!user){
      throw Error
    }
    const userDocs=await databases.listDocuments(appWriteConfig.databaseId,appWriteConfig.userCollectionId)
    const currentUser = userDocs.documents.length && userDocs.documents.filter(u => u.accountId == user.$id)
    if(!currentUser) throw Error
    return currentUser[0]
  } catch (error) {
    console.log(error)
    return null
  }
}


export const createPost=async(post:submittedPost)=>{
  try {
    const uploadedFile = await uploadFile(post.postImage[0])
    if(!uploadFile) throw Error
    //get file url 
    const fileId = uploadedFile?.$id
    const fileUrl = getFilePreview(fileId!)
    if(!fileUrl) throw Error
    const newpost = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.postCollectionId,
        ID.unique(),
        {
          caption:post.caption,
          location:post.location,
          tags:post.tags.split(","),
          creator:post.creator,
          imageUrl:fileUrl,
          imageId:fileUrl
        }
      )


      return newpost
  } catch (error) {
    console.log(error)
    return false
  }
}

export const uploadFile=async(file:File)=>{
  try {
    const uploadedFile = storage.createFile(appWriteConfig.storageId,ID.unique(),file)
    return uploadedFile
  } catch (error) {
    return null
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appWriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}


//fetch posts

export const fetchPosts = async() => {
  try {
    const fetchedPosts = await databases.listDocuments(appWriteConfig.databaseId,appWriteConfig.postCollectionId)
    return fetchedPosts
  } catch (error) {
    return null
  }
}


//likepost
export const likePost=async(postId:string,likesArray:string[])=>{
  try {
      const updatePost=await databases.updateDocument(appWriteConfig.databaseId,appWriteConfig.postCollectionId,
        postId,{
          likes:likesArray
        })

      if(!updatePost) throw Error 
      return updatePost
  } catch (error) {
    console.log(error)
  }
}


//likepost
export const savePost=async(postId:string,userId:string)=>{
  try {
    const saves = await databases.listDocuments(appWriteConfig.databaseId,appWriteConfig.savesCollectionId)
    const isAlreadyExist = saves.documents.find(doc => doc.post == postId && doc.user==userId)  
    if(!isAlreadyExist){
      const savedPost=await databases.createDocument(appWriteConfig.databaseId,appWriteConfig.savesCollectionId,
        ID.unique(),{
          user:userId,
          post:postId
        })

      if(!savedPost) throw Error 
      return savedPost
    }
    return isAlreadyExist
  } catch (error) {
    console.log(error)
  }
}

//likepost
export const deleteSavedPost=async(savedPostId:string)=>{
  try {
      const statusCode=await databases.deleteDocument(appWriteConfig.databaseId,appWriteConfig.savesCollectionId,
        savedPostId)

      if(!statusCode) throw Error 
      return statusCode
  } catch (error) {
    console.log(error)
  }
}


export const getPostById=async(postId:string)=>{
  try {
    const post = await databases.getDocument(appWriteConfig.databaseId,appWriteConfig.postCollectionId,postId)
    return post ? post :  null
  } catch (error) {
    console.log(error)
  }
}

export const updatePost=async(post:IUpdatedPostprops)=>{
  try {
    //we need to check if the user has update the image or not
    const hasUploadAFile = post.postImage.length > 0
    //get the old image 
    let image ={
      imageId:post?.imageId,
      imageUrl:post?.imageUrl
    }

    if(hasUploadAFile){
      const uploadedFile = await uploadFile(post.postImage[0])
      if(!uploadFile) throw Error
      //get file url 
      const fileId = uploadedFile?.$id
      const fileUrl = getFilePreview(fileId!)
      if(!fileUrl) throw Error
      image = {
        ...image,
        imageUrl:fileUrl,
        imageId:uploadedFile?.$id!
      }
    }
    
    const updatedPost = await databases.updateDocument(
        appWriteConfig.databaseId,
        appWriteConfig.postCollectionId,
        post?.id,
        {
          caption:post.caption,
          location:post.location,
          tags:post.tags.split(","),
          creator:post.creator,
          ...image
        }
      )

      return updatedPost
  } catch (error) {
    console.log(error)
    return false
  }
}



export const getInfinitePosts=async({pageParam}:{
  pageParam:number
})=>{
  const queries = [Query.orderDesc("$updatedAt"),Query.limit(3)]
  if(pageParam){
    queries.push(Query.cursorAfter(pageParam.toString()))
  }

  try {
    const posts = await databases.listDocuments(appWriteConfig.databaseId,appWriteConfig.postCollectionId)
    return posts
  } catch (error) {
    console.log(error)
  }

}

export const deletePost=async(postId:string,imageId:string)=>{
  try {
    if(!postId || !imageId) throw Error
    await databases.deleteDocument(appWriteConfig.databaseId,appWriteConfig.postCollectionId,postId)
    await storage.deleteFile(appWriteConfig.storageId,imageId)
    return {status:true}
  } catch (error) {
    console.log(error)
    return false
  }
  
}


export const searchPosts=async(searchTerm:string)=>{
  try {
    console.log("called")
    const posts = await databases.listDocuments(appWriteConfig.databaseId,appWriteConfig.postCollectionId,[
      Query.search("caption",searchTerm)
    ])
    console.log(posts)
    return posts
  } catch (error) {
    console.log(error)
  }
}


export const getAllCreators=async()=>{
  try {
    const users = await databases.listDocuments(appWriteConfig.databaseId,appWriteConfig.userCollectionId)
    if(!users) throw Error
    return users
  } catch (error) {
    console.log(error)
    return false
  }
}