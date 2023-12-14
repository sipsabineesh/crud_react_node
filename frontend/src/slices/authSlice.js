import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};
console.log("-------------------------------")
console.log(initialState)
// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setCredentials : (state,action) =>
//         {
//             console.log('Payload:', action.payload);
//             state.userInfo = action.payload;
//             localStorage.setItem('userInfo',JSON.stringify(action.payload));
//         },
//         logout: (state,action) =>{
//             state.userInfo = null;
//             localStorage.removeItem('userInfo');
//         }
//     }
// });                                                                                                            
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

      setCredentials: (state, action) => {
        console.log(action.payload)
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      },
      logout: (state, action) => {
        state.userInfo = null;
        localStorage.removeItem('userInfo');
      },
    },
  });
  
export const {setCredientials,logout} = authSlice.actions;

export default authSlice.reducer;
