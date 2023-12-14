import {apiSlice} from './apiSlice';
const USERS_URL ='/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
 endpoints:(builder) => ({
        login:builder.mutation({
            query : (data) => ({
                url:'http://localhost:8000/api/users/auth',
                method:'POST',
                body:data
            }),
        }), 
        register:builder.mutation({
            query : (data) => ({
                url:'http://localhost:8000/api/users/',
                method:'POST',
                body:data
            }),
        }), 
        logout:builder.mutation({
            query : () => ({
                url:'http://localhost:8000/api/users/logout',
                method:'POST'
            })
        }),
        updateUser:builder.mutation({
            query : (data) => ({
                url:'http://localhost:8000/api/users/profile',
                method:'PUT',
                body:data
            }),
        }), 
    }),
})
export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation } = usersApiSlice;