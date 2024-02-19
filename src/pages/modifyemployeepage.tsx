import React, { useState, useEffect } from 'react'
import useNotification, {
	notificationErrorHandler,
} from '@customhooks/useNotification'
import { useNavigate } from 'react-router-dom'
import {
	useGetEmployeeByIDQuery,
	useUpdateEmployeeMutation,
	useCreateEmployeeMutation,
} from '@slices/apiSlice'
import {
	EmployeeType,
	EmployeeDataType,
	DepartmentType,
} from '@utils/projecttypes'
import { TextField, Button, MenuItem } from '@mui/material'

type ModifyEmployeePage = {
	text: string
	id?: number
}

export default function ModifyEmployeePage({
	text,
	id = -1,
}: ModifyEmployeePage) {
	const navigate = useNavigate()
	const [updateEmp, { isLoading: isUpdating, isSuccess: isSuccessUpdate }] =
		useUpdateEmployeeMutation()
	const [createEmp, { isLoading: isCreating, isSuccess: isSuccessCreating }] =
		useCreateEmployeeMutation()
	const [form, setForm] = useState({
		name: '',
		department: DepartmentType.PS,
		salary: 0,
	})
	const [error, setError] = useState({
		nameError: false,
		salaryError: false,
	})

	if (text === 'Update Employee' && id !== -1) {
		const { data, isSuccess } = useGetEmployeeByIDQuery(id)
		useEffect(() => {
			if (isSuccess && data) {
				const { id: empid, ...formDataWithoutId } = data as EmployeeType
				setForm(formDataWithoutId)
			}
		}, [isSuccess, data])
	}

	const validateForm = (data: EmployeeDataType): boolean => {
		let err = true
		// Validation for name
		if (data.name.length > 4) {
			setError((prev) => ({ ...prev, nameError: false }))
		} else {
			err = false
			setError((prev) => ({ ...prev, nameError: true }))
		}
		// Validation for salary
		if (data.salary > 0) {
			setError((prev) => ({ ...prev, salaryError: false }))
		} else {
			err = false
			setError((prev) => ({ ...prev, salaryError: true }))
		}
		return err
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (validateForm(form)) {
			if (text === 'Update Employee') {
				updateEmp({ id, EmployeeData: form })
					.unwrap()
					.then(() => {
						useNotification('success', `Successfully ${text}!`, 2000)
						navigate('/home')
					})
					.catch((err: { status: string; error: any }) => {
						notificationErrorHandler(err, text)
					})
			} else if (text === 'Add Employee') {
				createEmp({ EmployeeData: form })
					.unwrap()
					.then(() => {
						useNotification('success', `Successfully ${text}!`, 2000)
						sessionStorage.setItem('progression', '-1')
						navigate('/home')
					})
					.catch((err: { status: string; error: any }) => {
						notificationErrorHandler(err, text)
					})
			}
		}
	}

	const handleFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value: string | number = e.target.value
		if (e.target.name === 'salary') {
			value = Math.abs(parseInt(value, 10)) || form.salary
		}
		setForm((prev) => ({ ...prev, [e.target.name]: value }))
	}

	return (
		<section style={{ margin: '30px' }}>
			<h2>{text}</h2>
			<form onSubmit={handleSubmit}>
				<TextField
					type="text"
					variant="outlined"
					color="secondary"
					label="name"
					name="name"
					onChange={handleFormChanges}
					value={form.name}
					fullWidth
					required
					sx={{ mb: 4 }}
					helperText={
						error.nameError ? 'Name has to be more than 4 characters!' : ''
					}
					error={error.nameError}
				/>
				<TextField
					variant="outlined"
					color="secondary"
					label="department"
					name="department"
					onChange={handleFormChanges}
					value={form.department}
					fullWidth
					required
					select
					sx={{ mb: 4 }}
				>
					{Object.values(DepartmentType).map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
				<TextField
					type="number"
					variant="outlined"
					color="secondary"
					label="salary"
					name="salary"
					onChange={handleFormChanges}
					value={form.salary.toString()}
					fullWidth
					required
					helperText={
						error.salaryError ? 'Salary has to be positive number!' : ''
					}
					error={error.salaryError}
					sx={{ mb: 4 }}
				/>
				<Button variant="outlined" color="secondary" type="submit">
					{text.split(' ')[0]}
				</Button>
			</form>
		</section>
	)
}
