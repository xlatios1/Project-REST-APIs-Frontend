export const useIntToCurrency = (
	value: number,
	currency: string = 'USD'
): string => {
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: currency,
        minimumFractionDigits: 0,  // Set minimum fraction digits to 0 for whole numbers
        maximumFractionDigits: 0,  // Set maximum fraction digits to 0 for whole numbers
        useGrouping: true,
	})
}
