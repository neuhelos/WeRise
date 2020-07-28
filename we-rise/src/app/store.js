import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/Authentication/AuthenticationSlice';
import workshopFeedReducer from '../features/WorkshopFeed/WorkshopFeedSlice'

export default configureStore({
  reducer: {
    currentUserSession: authenticationReducer,
    workshopFeed: workshopFeedReducer
  },
});
