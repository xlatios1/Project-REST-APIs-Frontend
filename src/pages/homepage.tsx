import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import {
	Grid,
	CircularProgress,
	Box,
	Button,
	Typography,
	Modal,
	Paper,
} from '@mui/material'
import {
	useDeleteEmployeeByIDMutation,
	useGetAllEmployeesQuery,
} from '@slices/apiSlice'
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
	const [open, setOpen] = useState(0)
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
		setOpen(() => 0)
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

	const modelStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 550,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		borderRadius: '10px',
		boxShadow: 12,
		p: 2,
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
												onDelete={() => setOpen(() => emp.id!)}
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
			{isSuccess && (
				<Pagination
					currentPage={+window.location.hash.slice(1)}
					totalEntries={data.length}
					totalPages={totalPage}
					isMobile={isMobile}
					onPageChange={handleChangePage}
				></Pagination>
			)}
			{open &&
				createPortal(
					<Modal
						open={Boolean(open)}
						onClose={() => setOpen(0)}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Paper sx={modelStyle}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									<strong>
										You are about to promote an employee to client
									</strong>
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
									This will delete your employee from database permanently.
								</Typography>
								<Typography id="modal-modal-description">
									Are you sure?
								</Typography>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									mt: '20px',
								}}
							>
								<Button onClick={() => setOpen(() => 0)}>Cancel</Button>
								<Button
									sx={{ ml: '10px', background: 'red', color: 'black' }}
									onClick={() => handleDelete(open)}
								>
									Delete
								</Button>
							</Box>
						</Paper>
					</Modal>,
					document.body
				)}
		</section>
	)
}
