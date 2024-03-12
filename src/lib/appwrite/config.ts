import {Client,Account,Databases,Avatars,Storage} from "appwrite"

console.log(import.meta.env.VITE_ENDPOINT_URL)

export const appWriteConfig={
    projectId:import.meta.env.VITE_APPWRITE_PROJECTID,
    url:import.meta.env.VITE_ENDPOINT_URL,
    storageId:import.meta.env.VITE_APPWRITE_STORAGE_MEDIA_BUCKET,
    databaseId:import.meta.env.VITE_APPWRITE_DB_ID,
    postCollectionId:import.meta.env.VITE_APPWRITE_COLLECTION_POSTS,
    userCollectionId:import.meta.env.VITE_APPWRITE_COLLECTION_USERS,
    savesCollectionId:import.meta.env.VITE_APPWRITE_COLLECTION_SAVES
}

export const client = new Client()

client.setProject(appWriteConfig.projectId)
client.setEndpoint(appWriteConfig.url)

export const account=new Account(client)
export const avatars=new Avatars(client)
export const storage=new Storage(client)
export const databases=new Databases(client)