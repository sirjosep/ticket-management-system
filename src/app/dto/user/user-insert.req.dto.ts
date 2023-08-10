export interface UserInsertReqDto {
	email: string
	roleId: number
	companyId: number
	profileName: string
	profilePhone: string
	profileAddress: string
	file?: string
	fileFormat?: string
}
