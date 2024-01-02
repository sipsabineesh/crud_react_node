import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState :{ 
    users : [],
},
  reducers: {
    getUserList: (state, action) => {
      state.users = action.payload;
    },
    // createUser:(state,action) => {
    //   state.users.push(action.payload)
    // }
  },
});

export const { getUserList,createUser } = userSlice.actions;

export default userSlice.reducer;
