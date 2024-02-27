import {
	primaryColorBlue,
	primaryColorGray,
	deleteBtnColor,
	editBtnColor,
} from '@utils/projectstyles'
import { Paper, Box, Typography, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useIntToCurrency } from '@customhooks/useIntToCurrency'
import ModalForm from '@components/modelform'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteEmployeeByIDMutation } from '@store/employee/employeeApi'
import useNotification from '@customhooks/useNotification'

interface EmployeeDetailsProps {
	id: number
	name: string
	department: string
	salary: number
	isLoading: boolean
	dispatchChangePage: (target: string) => void
}

const paperStyle = {
	display: 'flex',
	padding: '0 16px',
	background: primaryColorGray,
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
}

export const EmployeeDetails = ({
	id,
	name,
	department,
	salary,
	isLoading,
	dispatchChangePage,
}: EmployeeDetailsProps) => {
	const [open, setOpen] = useState(0)
	const navigate = useNavigate()
	const [deleteEmp, { isSuccess }] = useDeleteEmployeeByIDMutation()

	//handles editing of employee
	const handleEdit = (): void => {
		// sessionStorage.setItem('progression', window.location.hash.slice(1))
		navigate(`/updateEmployee/${id}`)
	}

	//handles deleting of employee
	const handleDelete = async (): Promise<void> => {
		await deleteEmp(id)
	}

	useEffect(() => {
		if (isSuccess) {
			setOpen(0)
			dispatchChangePage('delete')
			useNotification('success', `Successfully deleted employee ${id}`, 2000)
		}
	}, [isSuccess])

	return (
		<>
			<Paper elevation={0} sx={paperStyle}>
				<Box
					display="flex"
					alignItems="flex-start"
					flexDirection="column"
					sx={{ maxWidth: `calc(100% - 80px)` }}
				>
					<Typography
						variant="h4"
						sx={{ color: primaryColorBlue, wordBreak: 'break-word' }}
					>
						{/* <>{id}:</> */}
						<strong>{name}</strong>
					</Typography>
					<Typography variant="h6" sx={{ color: primaryColorBlue }}>
						{department}
					</Typography>
					<Typography variant="h6" sx={{ color: primaryColorBlue }}>
						{useIntToCurrency(salary)}
					</Typography>
				</Box>
				<Box display="flex" sx={{ width: '80px' }}>
					<IconButton sx={{ color: editBtnColor }} onClick={handleEdit}>
						<EditIcon />
					</IconButton>
					<IconButton
						sx={{ color: deleteBtnColor }}
						onClick={() => setOpen(id)}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			</Paper>
			<ModalForm
				open={open}
				handleClose={() => setOpen(0)}
				handleDelete={handleDelete}
			></ModalForm>
		</>
	)
}
