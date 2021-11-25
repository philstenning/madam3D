import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {  db, ICurrentFolder } from "../db/db";

interface IFolderState {
  currentFolder: ICurrentFolder | null;
  showDialog: boolean;
  cursor:number
  // folders: IFolder[];
}

const initialState: IFolderState = {
  currentFolder: null,
  showDialog: false,
  cursor:0
};
const getKnownFoldersAsync = createAsyncThunk(
  "getKnownFoldersAsync",
  async () => {
    try {
      return await db.folders.toArray();
    } catch (error) {
      throw new Error(`Error fetching data from local database. ${error}`);
    }
  }
);

const deleteFolderAsync = createAsyncThunk(
  "deleteFolderAsync",
  async (folderId: number) => {
    try {
      await db.folders.delete(folderId);
      return folderId;
    } catch (error) {
      throw new Error(`Error deleting folder from local database. ${error}`);
    }
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    hideDeleteFolderDialog(state) {
      state.showDialog = false;
    },
    showDeleteFolderDialog(state) {
      state.showDialog = true;
    },
    setCurrentFolder(state, action: PayloadAction<ICurrentFolder>) {
      state.currentFolder = action.payload;
    },
    deleteFolder(state) {},
    setCursor(state,action:PayloadAction<number>){
      state.cursor = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFolderAsync.fulfilled, (state, action) => {
        // state.folders.filter((folder) => folder.id !== action.payload);
        state.showDialog=false
      })
      .addCase(getKnownFoldersAsync.fulfilled,(state,action)=>{
          // state.folders = action.payload
      });

  },
});

export const {
  hideDeleteFolderDialog,
  showDeleteFolderDialog,
  setCurrentFolder,
  setCursor,
} = folderSlice.actions;

export { deleteFolderAsync, getKnownFoldersAsync };

export default folderSlice.reducer;
