import {apiSlice} from './apiSlice';
const USERS_URL ='/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
 endpoints:(builder) => ({
    
    adminLogin:builder.mutation({
        query : (data) => ({
            url:'http://localhost:8000/api/users/adminLogin',
            method:'POST',
            body:data
        }),
    }), 
   createUsers:builder.mutation({
        query : (data) => ({
            url:'http://localhost:8000/api/users/createUsers',
            method:'POST',
            body:data
        }),
    }), 
    adminUserUpdate:builder.mutation({
        query : (data) => ({
            url:'http://localhost:8000/api/users/updateUsers',
            method:'PUT',
            body:data
        }),
    }),
    adminDeleteUsers:builder.mutation({
        query : (data) => ({
            url:'http://localhost:8000/api/users/deleteUsers',
            method:'PUT',
            body:data
        }),
    }), 
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
export const { 
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useAdminLoginMutation,
    useCreateUsersMutation,
    useAdminUserUpdateMutation,
    useAdminDeleteUsersMutation,
 } = usersApiSlice;