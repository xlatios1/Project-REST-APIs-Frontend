import { useMediaQuery, useTheme } from '@mui/material'

export const useCustomMedia = () => {
	const theme = useTheme()
	return useMediaQuery(theme.breakpoints.down('sm'))
}
