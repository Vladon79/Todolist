import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (params, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}));
    } else {

    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled,(state)=>{
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC} = slice.actions
export const {setAppStatusAC} = slice.actions


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>