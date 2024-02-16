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

export default function NavBar({ path }: { path: string }) {
	const navigate = useNavigate()

	const isMobile = useCustomMedia()
	const atModifingPage = (path === '/newEmployee' || path.includes('/updateEmployee'))
	const handleAddEmployeeBtn = () => {
		sessionStorage.setItem('progression', window.location.hash.slice(1))
		navigate('/newEmployee')
	}

	const handleBackBtn = () => {
		navigate('/home')
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar style={{ backgroundColor: primaryColorBlue }}>
					<Typography
						variant="h4"
						component="div"
						sx={{ flexGrow: 1 }}
						style={{ fontWeight: 'bold' }}
					>
						Employees
					</Typography>
					<Button
						color="inherit"
						style={{
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
								style={{
									fontSize: !isMobile ? '' : '35px',
								}}
							/>
						)}
						{!isMobile && (
							<Typography variant="body1" style={{ margin: '0 10px' }}>
								{atModifingPage ? 'Back' : 'Add Employee'}
							</Typography>
						)}
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
