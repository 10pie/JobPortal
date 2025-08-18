import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText: "",
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSingleJob:(state,action) =>{
            state.singleJob = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        clearAllJobs:(state) => {
            state.allJobs = [];
            state.allAdminJobs = [];
            state.singleJob = null;
            state.searchJobByText = "";
        }
    }
});
export const {
    setAllJobs, 
    setAllAdminJobs, 
    setSingleJob, 
    setSearchJobByText,
    clearAllJobs
} = jobSlice.actions;
export default jobSlice.reducer;