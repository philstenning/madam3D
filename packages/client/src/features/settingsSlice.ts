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
  folder: {
    settingDetailsIsOpen: boolean;
    searchFiltersParts: boolean;
  };
}

export type PartsFilter = "selectedFiles" | "unSelectedFiles" | "allFiles";

const initialState: ISettings = {
  partsFilter: "allFiles",
  show: {
    gcode: false,
    obj: false,
    stl: true,
    threeMF: true,
  },
  folder: {
    settingDetailsIsOpen: false,
    searchFiltersParts: true,
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
    toggleSettingsDetails(state) {
      state.folder.settingDetailsIsOpen = !state.folder.settingDetailsIsOpen;
    },
    toggleSearchFiltersParts(state) {
      state.folder.searchFiltersParts = !state.folder.searchFiltersParts;
    },
  },
});

export const {
  toggleGcode,
  toggle3mf,
  setPartFilter,
  toggleObj,
  toggleStl,
  toggleSettingsDetails,
  toggleSearchFiltersParts,
} = settingsSlice.actions;

export default settingsSlice.reducer;
