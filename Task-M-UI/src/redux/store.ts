import {configureStore} from "@reduxjs/toolkit";
import projectSlice from "./project-slice.ts";

export const store = configureStore({
    reducer: {
        projects: projectSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;