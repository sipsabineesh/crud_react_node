import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

import  {apiSlice} from './slices/apiSlice';
const store = configureStore({
    reducer : {
        auth:authReducer,
        users:userReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;