import {apiSlice} from './apiSlice';
const USERS_URL ='/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
 endpoints:(builder) => ({
        login:builder.mutation({
            query : (data) => {
                console.log(`${USERS_URL}`)
               return {
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data
               }
            },
        }),   
    }),
})
export const { useLoginMutation } = usersApiSlice;