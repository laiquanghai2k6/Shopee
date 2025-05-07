import { requestUser } from "./axiosRequest"

export const GetNewAccessToken  =async () => {
    const response = await requestUser.get('/refreshToken')
    return response.data as string
}
 
