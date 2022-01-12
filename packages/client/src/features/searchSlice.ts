import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


interface ISearch{
    searchText:string;
}

const initialState:ISearch={
    searchText:''
}


const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setSearchText(state,action:PayloadAction<string>){
            state.searchText= action.payload.trim().toLowerCase()
        },
        clearSearchText(state){
            state.searchText=''
        }

    }
})

export const {setSearchText,clearSearchText} = searchSlice.actions

export default searchSlice.reducer