import { FileTicketCommentResDto } from "./file-ticket-comment.res.dto"

export interface TicketCommentResDto {
	id: number
	fileId: number
	userId: number
	profileName: string
	roleName: string
	ticketCommentBody: string
	createdAt: string
	files: FileTicketCommentResDto[]
}
