import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "../reduxStore/authSlice"
import postReducer from "../reduxStore/postSlice"
import commentReducer from "../reduxStore/commentSlice"

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    comment: commentReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']