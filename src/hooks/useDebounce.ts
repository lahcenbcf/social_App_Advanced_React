import { useState,useEffect } from "react"


export default function useDebounce(value:string,delay:number){
        const [debouncedValue,setDebouncedValue]=useState(value)


        useEffect(()=>{
            const timeout = setTimeout(()=>{
                    setDebouncedValue(value)
            },delay || 500)

            return ()=>clearTimeout(timeout)
        },[value])

        return debouncedValue
}