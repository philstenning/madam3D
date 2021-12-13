import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import folderSlice from "./folderSlice";

// interface IFolderItem{
//     id:string
// }

interface ISelectedFolderItems{
    selectedItems:string[]
}

const initialState:ISelectedFolderItems ={
   selectedItems:[]
}


const selectedFolderItemsSlice = createSlice({
  name: "selectedFolderItems",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.selectedItems.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item != action.payload
      );
    },
    clear(state) {
      state.selectedItems = [];
    },
  },
});

export const {  addItem,removeItem,clear} = selectedFolderItemsSlice.actions

export default selectedFolderItemsSlice.reducer