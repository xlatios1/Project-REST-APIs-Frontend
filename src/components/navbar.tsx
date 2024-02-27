import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone'
import { primaryColorBlue, primaryColorGreen } from '@utils/projectstyles'
import { useCustomMedia } from '@customhooks/useCustomMedia'
import { useNavigate } from 'react-router-dom'
import { useGetAllEmployeesQuery } from '@store/employee/employeeApi'
import { useDispatch } from 'react-redux'
import { setTotalEntries, setTotalPages } from '@store/pagination/pageSlice'
import { useEffect } from 'react'

export default function NavBar({ path }: { path: string }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isMobile = useCustomMedia()
	const { data: allData } = useGetAllEmployeesQuery()

	//Handles when component mounts
	useEffect(() => {
		if (allData) {
			console.log('Erms')
			dispatch(setTotalEntries(allData.length))
			dispatch(setTotalPages(Math.ceil(allData.length / 10)))
		}
	}, [allData])

	const atModifingPage =
		path === '/newEmployee' || path.includes('/updateEmployee')
	const handleAddEmployeeBtn = () => {
		navigate('/newEmployee')
	}

	const handleBackBtn = () => {
		navigate('/home')
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar sx={{ backgroundColor: primaryColorBlue }}>
					<Typography
						variant="h4"
						component="div"
						sx={{ flexGrow: 1, fontWeight: 'bold' }}
					>
						Employees
					</Typography>
					<Button
						color="inherit"
						sx={{
							backgroundColor: !isMobile ? primaryColorGreen : 'inherit',
							padding: '10px 10px',
							fontSize: '18px',
						}}
						onClick={() => {
							if (atModifingPage) {
								handleBackBtn()
							} else {
								handleAddEmployeeBtn()
							}
						}}
					>
						{atModifingPage ? (
							<ArrowBackTwoToneIcon />
						) : (
							<AddCircleIcon
								sx={{
									fontSize: !isMobile ? '' : '35px',
								}}
							/>
						)}
						{!isMobile && (
							<Typography variant="body1" sx={{ margin: '0 10px' }}>
								{atModifingPage ? 'Back' : 'Add Employee'}
							</Typography>
						)}
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
