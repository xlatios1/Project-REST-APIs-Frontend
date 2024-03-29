// https://fkhadra.github.io/react-toastify/introduction/
import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function useNotification(
	toastType: string,
	message: string,
	duration: number = 3000
) {
	const toastConfig: ToastOptions<{}> = {
		position: 'top-center',
		autoClose: duration,
		closeOnClick: true,
		draggable: true,
		theme: 'light',
	}
	switch (toastType) {
		case 'info':
			return toast.info(message, toastConfig)
		case 'success':
			return toast.success(message, toastConfig)
		case 'warning':
			return toast.warning(message, toastConfig)
		case 'error':
			return toast.error(message, toastConfig)
		default:
			return toast(message, toastConfig)
	}
}

export const notificationErrorHandler = (
	err: {
		status: string
		error: any
	},
	text: string = '',
	duration: number = 2000
) => {
	if (err.status === 'FETCH_ERROR') {
		useNotification(
			'error',
			`Error: Unable to establish network error`,
			duration
		)
	} else {
		useNotification('error', `Error: Unable to ${text}!`, duration)
	}
}