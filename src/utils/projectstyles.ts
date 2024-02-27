export const primaryColorBlue = '#2d5374'
export const primaryColorGreen = '#00952b'
export const primaryColorGray = '#eaeaea'
export const secondaryColorGray = 'grey'

export const editBtnColor = 'orange'
export const deleteBtnColor ='red'


export const paginationStyle = (isMobile: boolean) => {
	return {
		display: 'flex',
		alignItems: 'center',
		fontSize: '20px',
		justifyContent: isMobile ? 'flex-end' : 'space-between',
		marginTop: '10px',
		height: '47px',
	}
}

export const paginationButtonStyle = (isEnabled: boolean) => {
	return {
		fontWeight: 'bold',
		fontSize: '20px',
		color: isEnabled ? secondaryColorGray : primaryColorBlue,
		textTransform: 'none',
	}
}