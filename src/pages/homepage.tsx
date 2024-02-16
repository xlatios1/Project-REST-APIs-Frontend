import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, CircularProgress } from '@mui/material'
import { useDeleteEmployeeByIDMutation, useGetAllEmployeesQuery } from '@slices/apiSlice'
import type { EmployeeType } from '@utils/projecttypes'
import { EmployeeDetails } from '@components/employeedetails'
import { Pagination } from '@components/pagination'
import { useCustomMedia } from '@customhooks/useCustomMedia'
import useNotification from '@customhooks/useNotification'

export default function HomePage() {
	const navigate = useNavigate()
	const isMobile = useCustomMedia()
	const [deleteEmp] = useDeleteEmployeeByIDMutation()
	const [totalPage, setTotalPage] = useState(0)
	const { data, isLoading, isSuccess } = useGetAllEmployeesQuery(undefined, {
		refetchOnReconnect: true,
	})

	useEffect(() => {
		window.location.hash = sessionStorage.getItem('progression') || '1'
	}, [])

	useEffect(() => {
		console.time('filter array')
		if (!isLoading && isSuccess && Array.isArray(data)) {
			setTotalPage(Math.ceil(data!.length / 10))
		}
		console.timeEnd('filter array')
	}, [isLoading, isSuccess, data])

	const handleEdit = (id: number): void => {
		sessionStorage.setItem('progression', window.location.hash.slice(1))
		navigate(`/updateEmployee/${id}`)
	}

	const handleDelete = (id: number): void => {
		deleteEmp(id)
		useNotification('success', `Successfully deleted employee:${id}`, 1000)
	}

	const handleChangePage = (target: string): void => {
		let curPage = +window.location.hash.slice(1)
		if (target === 'next' && data) {
			window.location.hash = Math.min(curPage + 1, totalPage).toString()
		} else if (target === 'previous' && data) {
			window.location.hash = Math.max(curPage - 1, 0).toString()
		}
	}

	return (
		<section>
			<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
				<div style={{ width: '90%' }}>
					{data ? (
						<Grid container marginTop="20px" spacing={3}>
							{data.map((emp: EmployeeType, index: number) => {
								let curPage = +window.location.hash.slice(1)
								if ((curPage - 1) * 10 <= index && index < curPage * 10)
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
												onEdit={() => handleEdit(emp.id!)}
												onDelete={() => handleDelete(emp.id!)}
											></EmployeeDetails>
										</Grid>
									)
							})}
						</Grid>
					): (
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
				</div>
			</div>
			{isSuccess && (
				<Pagination
					currentPage={+window.location.hash.slice(1)}
					totalEntries={data.length}
					totalPages={totalPage}
					isMobile={isMobile}
					onPageChange={handleChangePage}
				></Pagination>
			)}
		</section>
	)
}
