import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { EmployeeDataType } from '@utils/projecttypes'

export const employeeApi = createApi({
	reducerPath: 'employeeApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_EMPLOYEE_API }),
	tagTypes: ['Employee'],
	endpoints: (builder) => ({
		getAllEmployees: builder.query<EmployeeDataType[], void>({
			query: () => `employee`,
            providesTags: ['Employee'],
		}),
        
		getEmployeeByID: builder.query<EmployeeDataType, number>({
            query: (id) => `employee/${id}`,
            providesTags: ['Employee'],
		}),

		createEmployee: builder.mutation<EmployeeDataType, { EmployeeData: EmployeeDataType }>({
			query: ({ EmployeeData }) => ({
				url: `/employee`,
				method: 'POST',
				body: EmployeeData,
			}),
            invalidatesTags: ['Employee'],
		}),

		updateEmployee: builder.mutation<EmployeeDataType, { id: number; EmployeeData: EmployeeDataType }>({
			query: ({ id, EmployeeData }) => ({
				url: `/employee/${id}`,
				method: 'PUT',
				body: EmployeeData,
			}),
            invalidatesTags: ['Employee'],
		}),

		//mutation is for creating, updating, or deleting
		deleteEmployeeByID: builder.mutation<void, number>({
			query: (id) => ({
				url: `employee/${id}`,
				method: 'DELETE',
			}),
            invalidatesTags: ['Employee'],
		}),
	}),
})

export const {
	useGetAllEmployeesQuery,
	useGetEmployeeByIDQuery,
	useCreateEmployeeMutation,
	useUpdateEmployeeMutation,
	useDeleteEmployeeByIDMutation,
} = employeeApi
