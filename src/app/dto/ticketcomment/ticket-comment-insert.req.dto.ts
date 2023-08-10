import { FileDto } from "../file/file.dto"

export interface TicketCommentInsertReqDto {
	ticketId: number
	ticketCommentBody: string
	files?: FileDto[]
}
