import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from '@pages/notfoundpage'
import LoginPage from '@pages/loginpage'
import ProtectedRoute from '@authentications/protectedroute'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastContainer } from 'react-toastify'

export default function App() {
	const renderProtectedPaths = (paths: string[]) =>
		paths.map((path: string) => (
			<Route key={path} path={path} element={<ProtectedRoute path={path} />} />
		))

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="light"
			/>
			<Router>
				<CssBaseline />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					{renderProtectedPaths([
						'/home',
						'/newEmployee',
						'/updateEmployee/:id',
					])}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	)
}
