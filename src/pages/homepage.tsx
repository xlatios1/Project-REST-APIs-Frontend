import { useEffect, useState } from 'react'
import { Grid, CircularProgress, Box } from '@mui/material'
import {
	useGetAllEmployeesQuery,
	useGetEmployeeByPageQuery,
} from '@store/employee/employeeApi'
import type { EmployeeType } from '@utils/projecttypes'
import { EmployeeDetails } from '@components/employeedetails'
import { Pagination } from '@components/pagination'
import { useCustomMedia } from '@customhooks/useCustomMedia'
import useNotification from '@customhooks/useNotification'
import { useDispatch, useSelector } from 'react-redux'
import {
	getPaginationDetails,
	setCurrentPage,
	setTotalEntries,
	setTotalPages,
} from '@store/pagination/pageSlice'
import { useLocation, useNavigate } from 'react-router-dom'

export default function HomePage() {
	const paginationDetails = useSelector(getPaginationDetails)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isMobile = useCustomMedia()
	const location = useLocation()
	const { data: allData, isError: isGetAllError } = useGetAllEmployeesQuery()
	const {
		data: pageData,
		isLoading: isLoadingPageData,
		isError: isGetPageDataError,
		isSuccess: isGetPageDataSuccess,
	} = useGetEmployeeByPageQuery(paginationDetails.currentPage)

	//Handles when component mounts
	useEffect(() => {
		if (allData) {
			dispatch(setTotalEntries(allData.length))
			dispatch(setTotalPages(Math.ceil(allData.length / 10)))
			let urlSearch = new URLSearchParams(location.search).get('page')
			if (
				!(
					urlSearch &&
					0 < +urlSearch &&
					+urlSearch <= Math.ceil(allData.length / 10)
				)
			) {
				urlSearch = paginationDetails.currentPage.toString()
			} else {
				dispatch(setCurrentPage(+urlSearch))
			}
			navigate(`/home?page=${urlSearch}`)
		}
	}, [allData])

	//Handles pagination navigation on changes
	const dispatchChangePage = (target: string): void => {
		let newPage = paginationDetails.currentPage
		switch (target) {
			case 'next':
				newPage += 1
				dispatch(setCurrentPage(newPage))
				navigate(`/home?page=${newPage}`)
				break
			case 'previous':
				newPage -= 1
				dispatch(setCurrentPage(newPage))
				navigate(`/home?page=${newPage}`)
				break
			case 'delete':
				const newTotalEntries = paginationDetails.totalEntries - 1
				dispatch(setTotalEntries(newTotalEntries))
				dispatch(setTotalPages(Math.ceil(newTotalEntries / 10)))
				dispatch(
					setCurrentPage(
						Math.min(
							Math.ceil(newTotalEntries / 10),
							paginationDetails.currentPage
						)
					)
				)
				break
		}
	}

	//handles onSuccess of deleting employee
	useEffect(() => {
		if (allData && allData.length > 0) {
			if (isGetPageDataError || isGetAllError) {
				useNotification(
					'error',
					`Error: Unable to establish network error`,
					2000
				)
			}
		}
	}, [isGetPageDataError, isGetAllError, allData])

	return (
		<section>
			{!isLoadingPageData && isGetPageDataSuccess ? (
				<div
					style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
				>
					{allData && allData.length > 0 ? (
						<div style={{ width: '90%' }}>
							<Grid container marginTop="20px" spacing={3}>
								{pageData?.map((emp: EmployeeType, index: number) => {
									return (
										<Grid
											item
											xs={isMobile ? 12 : 6}
											key={emp.id}
											sx={{
												display: 'flex',
												justifyContent: 'flex-start',
											}}
										>
											<EmployeeDetails
												{...emp}
												isLoading
												dispatchChangePage={dispatchChangePage}
											></EmployeeDetails>
										</Grid>
									)
								})}
							</Grid>
							<Pagination dispatchChangePage={dispatchChangePage}></Pagination>
						</div>
					) : (
						<Box display="flex" alignItems="center" height="calc(100vh - 64px)">
							No employee present! Start hiring~ ^^{' '}
						</Box>
					)}
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
						marginTop: '30px',
					}}
				>
					<CircularProgress color="inherit" />
				</div>
			)}
		</section>
	)
}
