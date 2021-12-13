import {configureStore} from '@reduxjs/toolkit' 
import folderReducer from '../features/folderSlice'
import selectedFolderItemsReducer from "../features/folderSelectedItems";

export const store = configureStore({
  reducer: {
    folderReducer,
    selectedFolderItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;