import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { TicketInsertReqDto } from "../dto/ticket/ticket-insert.req.dto";
import { TicketResDto } from "../dto/ticket/ticket.res.dto";
import { TicketDetailResDto } from "../dto/ticket/ticket-detail.res.dto";
import { TicketUpdateStatusReqDto } from "../dto/ticket/ticket-update-status.req.dto";

@Injectable({
    providedIn: "root"
})
export class TicketService {
    constructor(private base: BaseService) { }

    getAll(statusCode: string, withToken: boolean): Observable<TicketResDto[]> {
        if(statusCode === ''){
            return this.base.get<TicketResDto[]>(`http://localhost:8080/tickets`, withToken)
        } else {
            return this.base.get<TicketResDto[]>(`http://localhost:8080/tickets/?statusCode=${statusCode}`, withToken)
        }
    }

    getDetail(ticketId:number, withToken: boolean): Observable<TicketDetailResDto> {
        return this.base.get<TicketDetailResDto>(`http://localhost:8080/tickets/detail/?ticketId=${ticketId}`, withToken)
    }
    
    createTicket(data: TicketInsertReqDto, withToken: boolean): Observable<TicketInsertReqDto> {
        return this.base.post<TicketInsertReqDto>('http://localhost:8080/tickets', data, withToken)
    }

    changeStatus(data: TicketUpdateStatusReqDto, withToken: boolean): Observable<TicketUpdateStatusReqDto> {
        return this.base.patch<TicketUpdateStatusReqDto>('http://localhost:8080/tickets', data, withToken)
    }
}