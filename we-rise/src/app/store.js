import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/Authentication/AuthenticationSlice';
import workshopFeedReducer from '../features/WorkshopFeed/workshopFeedSlice'
import registeredWorkshopFeed from '../features/UserWorkshopsAgenda/RegisterWorkshopSlice'

export default configureStore({
  reducer: {
    currentUserSession: authenticationReducer,
    workshopFeed: workshopFeedReducer,
    registeredWorkshop:registeredWorkshopFeed
  },
});
