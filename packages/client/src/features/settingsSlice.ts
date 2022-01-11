import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db, ICurrentFolder, IFolder } from "../db";


interface ISettings {
  partsFilter: PartsFilter;
  show: {
    stl: boolean;
    gcode: boolean;
    threeMF: boolean;
    obj: boolean;
  };
}

type PartsFilter = "selectedFiles" | "unSelectedFiles" | "allFiles";

const initialState: ISettings = {
  partsFilter: "allFiles",
  show: {
    gcode: false,
    obj: false,
    stl: true,
    threeMF: true,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleGcode(state) {
      state.show.gcode = !state.show.gcode;
    },
    toggleStl(state) {
      state.show.stl = !state.show.stl;
    },
    toggle3mf(state) {
      state.show.threeMF = !state.show.threeMF;
    },
    toggleObj(state) {
      state.show.obj = !state.show.obj;
    },
    setPartFilter(state, action: PayloadAction<PartsFilter>) {
      state.partsFilter = action.payload;
    },
  },
});

export const { toggleGcode, toggle3mf, setPartFilter, toggleObj, toggleStl } =
  settingsSlice.actions;


  export default settingsSlice.reducer