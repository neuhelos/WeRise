import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authenticationReducer from '../features/Authentication/AuthenticationSlice';
import workshopFeedReducer from '../features/WorkshopFeed/WorkshopFeedSlice'
import registeredWorkshopFeedReducer from '../features/UserWorkshopsAgenda/RegisterWorkshopSlice'
import chatsReducer from '../features/Messaging/ChatSlice'

export default configureStore({
  reducer: {
    currentUserSession: authenticationReducer,
    workshopFeed: workshopFeedReducer,
    registeredWorkshops: registeredWorkshopFeedReducer,
    chats: chatsReducer
  },
  middleware: [
    ...getDefaultMiddleware(), logger
  ],
});
