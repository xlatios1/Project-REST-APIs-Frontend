// employeeSlice.js
import { createSlice } from '@reduxjs/toolkit'
import type { EmployeeType } from '@utils/projecttypes'

const employeeSlice = createSlice({
	name: 'employeeData',
	initialState: {
		employees: [] as EmployeeType[],
	},
	reducers: {
		setEmployees: (state, action) => {
			state.employees = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setEmployees } = employeeSlice.actions
export default employeeSlice
