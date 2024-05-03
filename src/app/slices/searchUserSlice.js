import { createSlice } from "@reduxjs/toolkit"
export const searchUserSlice = createSlice({
  name: "searchUser",
  initialState: {
    criteriaUser: "",
  },
  reducers: {
    updateUserCriteria: (state, action) => {
      return {
        ...state,
        criteriaUser: action.payload,
      }
    },
  },
})
export const { updateUserCriteria } = searchUserSlice.actions
export const searchUserData = (state) => state.searchUser
export default searchUserSlice.reducer
