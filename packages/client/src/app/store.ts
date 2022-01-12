import {configureStore} from '@reduxjs/toolkit' 
import folderReducer from '../features/folderSlice'
import selectedFolderItemsReducer from "../features/folderSelectedItems";
import settingsReducer from '../features/settingsSlice'
import searchReducer from '../features/searchSlice'
export const store = configureStore({
  reducer: {
    searchReducer,
    settingsReducer,
    folderReducer,
    selectedFolderItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;