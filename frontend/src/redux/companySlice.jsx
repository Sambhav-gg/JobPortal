import { createSlice } from "@reduxjs/toolkit";

export const companySlice= createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:"",
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload;
        },
        setAllCompany:(state,action)=>{
            state.companies=action.payload;

        },
        setSearchCompanyByText:(state,action)=>{
            state.searchCompanyByText= action.payload;
        }
        
    }
});
export const { setAllCompany, setSingleCompany, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;