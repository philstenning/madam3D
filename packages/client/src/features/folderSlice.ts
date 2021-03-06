import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db, ICurrentFolder, IFolder } from "../db";
import {removeAllPartsForFolder} from './folderSelectedItems'
interface IFolderState {
  currentFolder: ICurrentFolder | null;
  showDialog: boolean;
  cursor: number;
  currentRootFolder: ICurrentFolder | null;
}

const initialState: IFolderState = {
  currentFolder: null,
  showDialog: false,
  cursor: 0,
  currentRootFolder: null,
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
  async (folderId: string,  thunkApi) => {
    thunkApi.dispatch(removeAllPartsForFolder(folderId));
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
    setCurrentFolder(state, action: PayloadAction<ICurrentFolder | null>) {
      state.currentFolder = action.payload;
    },
    setCurrentRootFolder(state, action: PayloadAction<ICurrentFolder | null>) {
      state.currentRootFolder = action.payload;
    },

    deleteFolder(state) {},
    setCursor(state, action: PayloadAction<number>) {
      state.cursor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFolderAsync.fulfilled, (state, action) => {
        // setting currentFolder to null will remove the parts
        // being displayed in the folder page.
        state.currentFolder = null;
        state.showDialog = false;
      })
      .addCase(getKnownFoldersAsync.fulfilled, (state, action) => {
        // state.folders = action.payload
      });
  },
});


export const {
  hideDeleteFolderDialog,
  showDeleteFolderDialog,
  setCurrentFolder,
  setCurrentRootFolder,
  setCursor,
} = folderSlice.actions;

export { deleteFolderAsync, getKnownFoldersAsync };

export default folderSlice.reducer;
