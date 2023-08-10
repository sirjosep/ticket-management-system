import { FileTicketResDto } from "./file-ticket.res.dto"

export interface TicketDetailResDto {
	id: number
	ticketCode: string
	ticketTitle: string
	ticketBody: string
	ticketDate: string
	profileName: string
	productName: string
	statusCode: string
	statusName: string
	priorityCode: string
	priorityName: string
	files: FileTicketResDto[]
}
