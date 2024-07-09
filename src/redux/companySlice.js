import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataCompany:{},
    allCompanies: [],
    companyMsgErr:{},
}

export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers : {
        setCompany: (state, action) => {
            state.dataCompany = action.payload
        },
        setAllCompanies: (state, action) => {
            state.allCompanies = action.payload
        },
        setCompanyMsgErr: (state, action) =>{
            state.companyMsgErr = action.payload
        }
    }
})


export const { setCompany, setAllCompanies, setCompanyMsgErr } = companySlice.actions;
export default companySlice.reducer