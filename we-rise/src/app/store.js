import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
//import logger from 'redux-logger';

import authenticationReducer from '../features/Authentication/AuthenticationSlice';
import workshopFeedReducer from '../features/WorkshopFeed/WorkshopFeedSlice'
import registeredWorkshopFeedReducer from '../features/RegisteredWorkshops/RegisteredWorkshopSlice'
import chatsReducer from '../features/Messaging/ChatSlice'
import loadingReducer from '../features/BaseComponents/loadingSlice'

export default configureStore({
  reducer: {
    currentUserSession: authenticationReducer,
    workshopFeed: workshopFeedReducer,
    registeredWorkshops: registeredWorkshopFeedReducer,
    chats: chatsReducer,
    loading: loadingReducer
  },
  middleware: [
    ...getDefaultMiddleware()
  ],
});
