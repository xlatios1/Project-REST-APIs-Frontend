import Button from '@mui/material/Button'
import { primaryColorBlue, secondaryColorGray } from '@utils/projectstyles'

type Pagination = {
	currentPage: number
	totalEntries: number
	totalPages: number
	isMobile: boolean
	dispatchChangePage: (target: string) => void
}

export const Pagination = ({
	currentPage,
	totalEntries,
	totalPages,
	isMobile,
	dispatchChangePage,
}: Pagination) => {
	const paginationStyle = {
		display: 'flex',
		alignItems: 'center',
		fontSize: '20px',
		justifyContent: isMobile ? 'flex-end' : 'space-between',
		margin: isMobile ? '10px 20px 0' : '10px 30px 0',
		height: '47px',
	}

	const buttonStyle = (isEnabled: boolean) => {
		return {
			fontWeight: 'bold',
			fontSize: '20px',
			color: isEnabled ? secondaryColorGray : primaryColorBlue,
			textTransform: 'none',
		}
	}

	return (
		<div style={paginationStyle}>
			{!isMobile && (
				<div style={{ color: primaryColorBlue }}>
					Showing
					<strong>
						{` ${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, totalEntries)} `}
					</strong>
					out of <strong>{totalEntries}</strong> entries
				</div>
			)}
			{totalEntries > 10 && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignContent: 'center',
					}}
				>
					<Button
						onClick={() => dispatchChangePage('previous')}
						sx={buttonStyle(currentPage === 1)}
						disabled={currentPage === 1}
					>
						Previous
					</Button>
					<div
						style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}
					>
						<strong>{currentPage}</strong>
					</div>
					<Button
						onClick={() => dispatchChangePage('next')}
						sx={buttonStyle(currentPage === totalPages)}
						disabled={currentPage === totalPages}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	)
}
