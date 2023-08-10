import { FileDto } from "../file/file.dto"

export interface TicketInsertReqDto {
	ticketTitle: string
	ticketBody: string
	productId: number
	ticketPriorityId: number
	fileLists?: FileDto[]
}
