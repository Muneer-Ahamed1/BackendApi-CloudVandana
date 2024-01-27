import { getValidation, patchByIdValidation } from "./validationApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getAllValidation = createAsyncThunk("/api/getAllValidation", async (isLogin, thunkApi) => {
    try {
        
        const response = await getValidation(isLogin);

        return response.data;

    }
    catch (e) {
        console.log("Error in getting all validation data");
        thunkApi.rejectWithValue(e);

    }

})

export const patchByIdValidationSlice = createAsyncThunk("/api/patchByIdValidationSlice", async (data, thunkApi) => {
    try {
        const response = await patchByIdValidation(data);
        return response;

    }
    catch (e) {
        throw thunkApi.rejectWithValue(e);

    }
})
const validation = createSlice({
    name: "validation",
    initialState: {
        loader:{
            loading:false,
            message:""
        },
        validationData: null,
        error: {
            error: false,
            message: ""
        },
        urlData: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllValidation.pending, (state) => {
            state.loader.loading = true;
            state.loader.message="Loading Meta Data"
        })
        builder.addCase(getAllValidation.fulfilled, (state, { payload }) => {
            state.loader.loading = false;
            state.validationData = payload;
            state.loader.message="";
        })
        builder.addCase(getAllValidation.rejected,(state,{payload})=>{
            state.error.error=true;
            state.error.message=payload;
            window.location.href="/";
            
        })
        builder.addCase(patchByIdValidationSlice.pending, (state) => {
            state.loader.loading = true;
            state.loader.message="Deploy Meta Data"
         

        })
        builder.addCase(patchByIdValidationSlice.fulfilled, (state, { payload }) => {
            state.loader.loading = false;
            state.loader.message="";
            alert("Deployed data");
        })
        builder.addCase(patchByIdValidationSlice.rejected,(state,{payload})=>{
            state.loader.loading=false;
            state.loader.message="";
            state.error.error=true;
            state.error.message=payload;
            alert("Something went wrong!!")


        })    
            


       
    }
})
export default validation.reducer;
