import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './usersReducers/user/usersReducer';

const appStore = configureStore({
  reducer: {
    login: loginReducer,
  },
});
export default appStore;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
