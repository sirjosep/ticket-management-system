import { FileTicketResDto } from "./file-ticket.res.dto"

export interface TicketResDto {
	id: number
	ticketCode: string
	ticketStatus: string
	ticketStatusCode: string
	ticketDate: string
	priorityCode: string
	priorityName: string
	files?: FileTicketResDto[]
}
