import { createSlice } from '@reduxjs/toolkit';

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    user: null,
  },
  reducers: {
    loginSucess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSucess } = usersReducer.actions;

export default usersReducer.reducer;
