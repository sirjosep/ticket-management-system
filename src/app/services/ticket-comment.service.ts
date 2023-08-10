import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { TicketCommentResDto } from "../dto/ticketcomment/ticket-comment.res.dto";
import { TicketCommentInsertReqDto } from "../dto/ticketcomment/ticket-comment-insert.req.dto";

@Injectable({
    providedIn: "root"
})
export class TicketCommentService {
    constructor(private base: BaseService) { }

    getAll(ticketId:number, withToken: boolean): Observable<TicketCommentResDto[]> {
        return this.base.get<TicketCommentResDto[]>(`http://localhost:8080/ticket-comments/?ticketId=${ticketId}`, withToken)
    }
    
    createComment(data: TicketCommentInsertReqDto, withToken: boolean): Observable<TicketCommentInsertReqDto> {
        return this.base.post<TicketCommentInsertReqDto>('http://localhost:8080/ticket-comments', data, withToken)
    }
}