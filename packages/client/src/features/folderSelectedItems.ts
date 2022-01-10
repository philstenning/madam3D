import { Parametric } from "@react-three/drei";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../db";
interface ISelectedPart {
  id: string;
  folderId:string;
}
interface ISelectedParts {
  selectedParts: ISelectedPart[];
}
const initialState: ISelectedParts = {
  selectedParts: [],
};

interface IAddPart{
  partId:string;
  folderId:string;
}

// const addPartAsync = createAsyncThunk(
//   "addPartAsync",
//   async ({ id, rootId }: ISelectedPart, { rejectWithValue }) => {
//     try {
//       const part = await db.folders.where("id").equals(id).first();
//       if (part) {
//         const res: ISelectedPart = { id: part.id, rootId: part.rootId };
//         return res;
//       } else {
//         return rejectWithValue(`no part with id:${id} found`);
//       }
//     } catch (error) {
//       throw new Error(
//         `Error getting record for ${id} from local database. ${error}`
//       );
//     }
//   }
// );

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
  extraReducers: (builder) => {
    builder
      // .addCase(addPartAsync.fulfilled, (state, action) => {
      //   state.selectedParts.push(action.payload);
      // })
      // .addCase(addPartAsync.rejected, (state, action) => {
      //   console.log(`error finding part in db ${action.payload}`);
      // });
  },
});

export const { removePart, clearParts, addPart, removeAllPartsForFolder } =
  selectedFolderItemsSlice.actions;

export default selectedFolderItemsSlice.reducer;

// export { addPartAsync };
