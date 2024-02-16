export enum DepartmentType {
	HR = 'HR',
	PS = 'PS',
}

export type EmployeeDataType = {
	name: string
	salary: number
	department: DepartmentType
}

export type EmployeeType = {
	id?: number
} & EmployeeDataType


