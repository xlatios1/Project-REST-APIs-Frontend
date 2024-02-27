// pageSlice.js
import { createSlice } from '@reduxjs/toolkit'

const pageSlice = createSlice({
	name: 'page',
	initialState: {
		pagination: { currentPage: 1, totalEntries: 0, totalPages: 0 },
	},
	reducers: {
		setCurrentPage: (state, action) => {
			state.pagination.currentPage = action.payload
		},
		setTotalEntries: (state, action) => {
			state.pagination.totalEntries = action.payload
		},
		setTotalPages: (state, action) => {
			state.pagination.totalPages = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setCurrentPage, setTotalEntries, setTotalPages } =
	pageSlice.actions
export default pageSlice
export const getPaginationDetails = (state: {
	page: {
		pagination: {
			currentPage: number
			totalEntries: number
			totalPages: number
		}
	}
}): { currentPage: number; totalEntries: number; totalPages: number } =>
	state.page.pagination
