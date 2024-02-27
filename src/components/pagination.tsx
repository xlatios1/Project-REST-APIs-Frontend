import Button from '@mui/material/Button'
import {
	primaryColorBlue,
	paginationButtonStyle,
	paginationStyle,
} from '@utils/projectstyles'
import { useCustomMedia } from '@customhooks/useCustomMedia'
import { useSelector } from 'react-redux'
import { getPaginationDetails } from '@store/pagination/pageSlice'

type Pagination = {
	dispatchChangePage: (target: string) => void
}

export const Pagination = ({ dispatchChangePage }: Pagination) => {
	const isMobile = useCustomMedia()
	const paginationDetails = useSelector(getPaginationDetails)

	return (
		<div style={paginationStyle(isMobile)}>
			{!isMobile && (
				<div style={{ color: primaryColorBlue }}>
					Showing
					<strong>
						{` ${(paginationDetails.currentPage - 1) * 10 + 1}-${Math.min(paginationDetails.currentPage * 10, paginationDetails.totalEntries)} `}
					</strong>
					out of <strong>{paginationDetails.totalEntries}</strong> entries
				</div>
			)}
			{paginationDetails.totalEntries > 10 && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignContent: 'center',
					}}
				>
					<Button
						onClick={() => dispatchChangePage('previous')}
						sx={paginationButtonStyle(paginationDetails.currentPage === 1)}
						disabled={paginationDetails.currentPage === 1}
					>
						Previous
					</Button>
					<div
						style={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}
					>
						<strong>{paginationDetails.currentPage}</strong>
					</div>
					<Button
						onClick={() => dispatchChangePage('next')}
						sx={paginationButtonStyle(
							paginationDetails.currentPage === paginationDetails.totalPages
						)}
						disabled={
							paginationDetails.currentPage === paginationDetails.totalPages
						}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	)
}
