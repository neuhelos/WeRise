import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authenticationReducer from '../features/Authentication/AuthenticationSlice';
import workshopFeedReducer from '../features/WorkshopFeed/workshopFeedSlice'
import registeredWorkshopFeedReducer from '../features/UserWorkshopsAgenda/RegisterWorkshopSlice'



export default configureStore({
  middleware: [
    logger, ...getDefaultMiddleware()

  ],
  reducer: {
    currentUserSession: authenticationReducer,
    workshopFeed: workshopFeedReducer,
    registeredWorkshops: registeredWorkshopFeedReducer
  },
});
