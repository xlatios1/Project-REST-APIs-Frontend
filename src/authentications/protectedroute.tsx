import { Route, useRoutes, useParams, Navigate } from 'react-router-dom'
import NavBar from '@components/navbar'
import HomePage from '@pages/homepage'
import ModifyEmployeePage from '@pages/modifyemployeepage'
import NotFound from '@pages/notfoundpage'

type ProtectedRouteProps = {
	path: string
}

export default function ProtectedRoute({ path }: ProtectedRouteProps) {
	let { id } = useParams();

	if (path.includes('/updateEmployee/') && !(+Number(id) > 0)) {
		console.log("Update Employee: Invalid employee ID")
		return <NotFound></NotFound>
	}

	return (
		<>
			<NavBar path={path} />
			{path === '/home' && <HomePage />}
			{path === '/newEmployee' && <ModifyEmployeePage text={'Add Employee'} />}
			{path.includes('/updateEmployee/') && <ModifyEmployeePage text={'Update Employee'} id={+id!}/>}
		</>
	)
}
