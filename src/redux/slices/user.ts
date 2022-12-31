import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string,
  email: string,
  password:string,
  id: string
}

interface UserState {
  user: User
}

const initialState = {
  user: {
    name:null,
    email:null,
    password:null,
    id:'randomid'
  }
} as UserState

const userSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = {
        name:null,
        email:null,
        password:null,
        id:'randomid'
      }
    }
  }
})

export const {signIn, signOut} = userSlice.actions
export default userSlice.reducer
