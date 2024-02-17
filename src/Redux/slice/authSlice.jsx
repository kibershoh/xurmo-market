import { createSlice } from '@reduxjs/toolkit'

const initialState = {
isLoggedIn:false,
email:null,
userName:null,
userId:null,
photoURL:null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER:(state,action)=>{
      const {email,userName,userId,photoURL} = action.payload
        state.isLoggedIn = true
        state.email = email
        state.userName = userName
        state.userId = photoURL
        state.userId = userId
    },
    REMOVE_ACTIVE_USER:(state,action)=>{
      state.isLoggedIn = false
        state.email = null
        state.userName = null
        state.userId = null
        state.photoURL = null
    },
  }
});

export const {SET_ACTIVE_USER,REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoading = (state)=>state.auth.isLoggedIn;

export const selectEmail = (state)=>state.auth.email
export const selectUserName = (state)=>state.auth.userName
export const selectUserId = (state)=>state.auth.userId
export const selectPhotoUrl = (state)=>state.auth.photoURL
export default authSlice.reducer