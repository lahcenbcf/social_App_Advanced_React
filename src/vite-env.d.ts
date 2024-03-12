/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APPWRITE_PROJECTID: string
    readonly VITE_ENDPOINT_URL:string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }