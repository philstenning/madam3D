
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
interface ISelectedPart {
  id: string;
  folderId:string;
  rootId: string;
}
interface ISelectedParts {
  selectedParts: ISelectedPart[];
}
const initialState: ISelectedParts = {
  selectedParts: [],
};


const selectedFolderItemsSlice = createSlice({
  name: "selectedFolderItems",
  initialState,
  reducers: {
    // addPart(state, action: PayloadAction<string>) {

    //   state.selectedParts.push({id:res.});
    // },
    removePart(state, action: PayloadAction<string>) {
      state.selectedParts = state.selectedParts.filter(
        (item) => item.id != action.payload
      );
    },
    clearParts(state) {
      state.selectedParts = [];
    },
    addPart(state,action:PayloadAction<ISelectedPart>){
      state.selectedParts.push(action.payload)
    },
    removeAllPartsForFolder(state,action:PayloadAction<string>){
     state.selectedParts= state.selectedParts.filter(part=> part.folderId !==action.payload)
    }
  },
  // extraReducers: (builder) => {
  //   builder
  // },
});

export const { removePart, clearParts, addPart, removeAllPartsForFolder } =
  selectedFolderItemsSlice.actions;

export default selectedFolderItemsSlice.reducer;

