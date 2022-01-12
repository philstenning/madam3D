import {configureStore} from '@reduxjs/toolkit' 
import folderReducer from '../features/folderSlice'
import selectedFolderItemsReducer from "../features/folderSelectedItems";
import settingsReducer from '../features/settingsSlice'
export const store = configureStore({
  reducer: {
    settingsReducer,
    folderReducer,
    selectedFolderItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;