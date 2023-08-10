import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { RoleCode, StatusCode } from "../../constant/enum.constants";
import { DevAssignmentResDto } from "../../dto/assignment/dev-assignment.res.dto";
import { TicketResDto } from "../../dto/ticket/ticket.res.dto";
import { UsersResDto } from "../../dto/user/users.res.dto";
import { DevAssignService } from "../../services/dev-assign.service";
import { TicketService } from "../../services/ticket.service";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'dev-assignment',
    templateUrl: './dev-assignment.component.html'
})
export class DevAssignmentComponent implements OnInit {

    devAssigns!: DevAssignmentResDto[]
    devs!: UsersResDto[]
    tickets!: TicketResDto[]
    visible!: boolean
    loading!: boolean

    constructor(private devAssignService: DevAssignService,
        private userService: UserService,
        private ticketService: TicketService,
        private fb: NonNullableFormBuilder){}

    devAssignReqDto = this.fb.group({
        devId: [0, Validators.required],
        ticketId: [0, Validators.required]
    })
    
    ngOnInit(){
        this.getDevAssigns()
        this.getDevs()
        this.getTickets()
    }

    getDevAssigns(){
        this.devAssignService.getAll(true).subscribe(result => {
            this.devAssigns = result
        })
    }

    getDevs(){
        this.userService.getAll(RoleCode.DEVELOPER, true).subscribe(result => {
            this.devs = result
        })
    }

    getTickets(){
        this.ticketService.getAll(StatusCode.OPEN, true).subscribe(result => {
            this.tickets = result
        })
    }

    assignDev(){
        this.loading = true
        const data = this.devAssignReqDto.getRawValue()
        this.devAssignService.assignDev(data, true).subscribe({
            next: () => {
                this.getDevAssigns()
                this.visible = false
            },
            error: () => {
                this.loading = false
            }
        })
    }

    showDialog(){
        this.visible = true
    }
}