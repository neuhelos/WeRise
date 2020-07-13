import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/Authentication/AuthenticationSlice';

export default configureStore({
  reducer: {
    currentUserSession: authenticationReducer,
  },
});
