import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { RoleResDto } from "../dto/role/role.res.dto";
import { TicketPriorityResDto } from "../dto/ticketpriority/ticket-priority.res.dto";

@Injectable({
    providedIn: "root"
})
export class TicketPriorityService {
    constructor(private base: BaseService) { }

    getAll(withToken: boolean): Observable<TicketPriorityResDto[]> {
        return this.base.get<TicketPriorityResDto[]>('http://localhost:8080/priorities', withToken)
    }
}