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

interface EmployeeDetailsProps {
	id: number
	name: string
	department: string
	salary: number
	isLoading: boolean
	onEdit: () => void
	onDelete: () => void
}

export const EmployeeDetails = ({
	id,
	name,
	department,
	salary,
	isLoading,
	onEdit,
	onDelete,
}: EmployeeDetailsProps) => {
	const paperStyle = {
		display: 'flex',
		padding: '0 16px',
		background: primaryColorGray,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	}

	return (
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
				<IconButton sx={{ color: editBtnColor }} onClick={onEdit}>
					<EditIcon />
				</IconButton>
				<IconButton sx={{ color: deleteBtnColor }} onClick={onDelete}>
					<DeleteIcon />
				</IconButton>
			</Box>
		</Paper>
	)
}
