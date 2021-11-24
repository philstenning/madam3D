import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IFolder, db } from "../db/db";

interface IFolderState {
  currentFolder: IFolder | null;
  showDialog: boolean;
  folders: IFolder[];
}

const initialState: IFolderState = {
  currentFolder: null,
  showDialog: false,
  folders: [],
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
    setCurrentFolder(state, action: PayloadAction<IFolder>) {
      state.currentFolder = action.payload;
    },
    deleteFolder(state) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFolderAsync.fulfilled, (state, action) => {
        state.folders.filter((folder) => folder.id !== action.payload);
        state.showDialog=false
      })
      .addCase(getKnownFoldersAsync.fulfilled,(state,action)=>{
          state.folders = action.payload
      });

  },
});

export const {
  hideDeleteFolderDialog,
  showDeleteFolderDialog,
  setCurrentFolder,
} = folderSlice.actions;

export { deleteFolderAsync, getKnownFoldersAsync };

export default folderSlice.reducer;
