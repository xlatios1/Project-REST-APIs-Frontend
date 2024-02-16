import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { employeeApi } from '@slices/apiSlice'
import employeeSlice from '@slices/employeeDataSlice'

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath]: employeeApi.reducer,
        employeeData: employeeSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(employeeApi.middleware)
    },
})

setupListeners(store.dispatch)