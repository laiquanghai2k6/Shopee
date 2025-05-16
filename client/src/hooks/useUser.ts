

import { requestAdmin, requestVouncher } from "@/service/axiosRequest"
import { Vouncher } from "@/slice/vouncherSlice"
import { useQuery } from "@tanstack/react-query"

export enum Role  {
    CLIENT='client',
    ADMIN='admin'
}

export type UserClient = {
    id:string,
    email:string,
    role:Role
}

const fetchUser = async (debounceInput:string)=>{
        try{
            if(debounceInput == ''){

                const res = await requestAdmin.get('/get-user')
            
                return res.data as UserClient[]
            }else{
                const res = await requestAdmin.get(`/search-user/${debounceInput}`)
                console.log(res)
                return res.data as UserClient[]
            }
        }catch(e){
        console.log(e)
        return[]
        }
}

export const useUser = (debounceInput:string)=>{
    return useQuery({
        queryKey:['users',debounceInput],
        queryFn:()=>fetchUser(debounceInput)
    })
}