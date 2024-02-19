import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, CircularProgress } from '@mui/material'
import {
	useDeleteEmployeeByIDMutation,
	useGetAllEmployeesQuery,
} from '@slices/apiSlice'
import type { EmployeeType } from '@utils/projecttypes'
import { EmployeeDetails } from '@components/employeedetails'
import { Pagination } from '@components/pagination'
import { useCustomMedia } from '@customhooks/useCustomMedia'
import useNotification from '@customhooks/useNotification'
import ModalForm from '@components/modelform'

export default function HomePage() {
	const navigate = useNavigate()
	const isMobile = useCustomMedia()
	const [deleteEmp, { isSuccess: isDeleteSuccess }] =
		useDeleteEmployeeByIDMutation()
	const [open, setOpen] = useState(0)
	const {
		data,
		isLoading,
		isSuccess: isGetSuccess,
	} = useGetAllEmployeesQuery(undefined, {
		refetchOnReconnect: true,
	})

	//Handles when component mounts
	useEffect(() => {
		window.location.hash = sessionStorage.getItem('progression') || '1'
	}, [])

	//Handles pagination navigation on changes
	const dispatchChangePage = (target: string): void => {
		if (data) {
			let curPage = +window.location.hash.slice(1)
			const totalPage = Math.ceil(data.length / 10)
			switch (target) {
				case 'next':
					window.location.hash = Math.min(curPage + 1, totalPage).toString()
					break
				case 'previous':
					window.location.hash = Math.max(curPage - 1, 0).toString()
					break
				case 'delete':
					console.log('Eh?', curPage, totalPage, data.length, data)
					if (curPage > totalPage) {
						window.location.hash = totalPage.toString()
					}
					break
			}
		}
	}

	//handles editing of employee
	const handleEdit = (id: number): void => {
		sessionStorage.setItem('progression', window.location.hash.slice(1))
		navigate(`/updateEmployee/${id}`)
	}

	//handles deleting of employee
	const handleDelete = async (id: number): Promise<void> => {
		await deleteEmp(id)
		setOpen(0)
	}

	//handles onSuccess of deleting employee
	useEffect(() => {
		if (isDeleteSuccess) {
			useNotification('success', `Successfully deleted employee!`)
			dispatchChangePage('delete')
		}
	}, [data])

	return (
		<section>
			<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
				<div style={{ width: '90%' }}>
					{!isLoading && data ? (
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
												onEdit={() => handleEdit(emp.id)}
												onDelete={() => setOpen(() => emp.id)}
											></EmployeeDetails>
										</Grid>
									)
							})}
						</Grid>
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
				</div>
			</div>
			{isGetSuccess && (
				<Pagination
					currentPage={+window.location.hash.slice(1)}
					totalEntries={data.length}
					totalPages={Math.ceil(data?.length / 10)}
					isMobile={isMobile}
					dispatchChangePage={dispatchChangePage}
				></Pagination>
			)}
			<ModalForm
				open={open}
				handleClose={() => setOpen(0)}
				handleDelete={() => handleDelete(open)}
			></ModalForm>
		</section>
	)
}
