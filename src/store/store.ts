import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { employeeApi } from '@store/employee/employeeApi'
import employeeSlice from '@store/employee/employeeDataSlice'
import pageSlice from '@store/pagination/pageSlice'

export const store = configureStore({
	reducer: {
		[employeeApi.reducerPath]: employeeApi.reducer,
		employeeData: employeeSlice.reducer,
		page: pageSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(employeeApi.middleware)
	},
})

setupListeners(store.dispatch)