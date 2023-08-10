import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PriorityCode, RoleCode, StatusCode } from "../../../constant/enum.constants";
import { FileDto } from "../../../dto/file/file.dto";
import { SubscribedProductResDto } from "../../../dto/subproduct/subscribed-product.res.dto";
import { TicketUpdateStatusReqDto } from "../../../dto/ticket/ticket-update-status.req.dto";
import { TicketResDto } from "../../../dto/ticket/ticket.res.dto";
import { TicketPriorityResDto } from "../../../dto/ticketpriority/ticket-priority.res.dto";
import { AuthService } from "../../../services/auth.service";
import { SubProductService } from "../../../services/sub-product.service";
import { TicketPriorityService } from "../../../services/ticket-priority.service";
import { TicketService } from "../../../services/ticket.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'ticket-list',
    templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit, AfterViewChecked{
    visible!: boolean
    loading!: boolean

    constructor(private authService: AuthService,
        private ticketService: TicketService,
        private ticketPriorityService: TicketPriorityService,
        private subProductService: SubProductService,
        private auth: AuthService,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef,
        private router: Router) { }

    priorities!: TicketPriorityResDto[]
    products!: SubscribedProductResDto[]
    tickets!: TicketResDto[]
    reOpenTickets!: TicketResDto[]
    fileDto!: FileDto
    userId!: number
    accountRoleCode!: string

    ticketReqDto = this.fb.group({
        ticketTitle: ['', Validators.required],
        ticketBody: ['', Validators.required],
        productId: [0, Validators.required],
        ticketPriorityId: [0, Validators.required],
        fileLists: this.fb.array([this.fileDto])
    })

    get isDeveloper(): boolean {
        return this.accountRoleCode == RoleCode.DEVELOPER
    }

    get isPic(): boolean {
        return this.accountRoleCode == RoleCode.PIC
    }

    get isCustomer(): boolean {
        return this.accountRoleCode == RoleCode.CUSTOMER
    }

    get fileLists() {
        return this.ticketReqDto.get('fileLists') as FormArray
    }

    ngOnInit() {
        const profile = this.auth.getProfile()
        this.getPriorities()
        this.getProducts()
        if (profile) {
            this.accountRoleCode = profile.roleCode
            if (profile.roleCode === RoleCode.PIC) {
                this.getOpenTickets()
                this.getReOpenTickets()
            } else {
                this.getTickets()
            }
        }
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    changeStatus(id: number){
        this.loading = true
        let ticketUpdateReqDto: TicketUpdateStatusReqDto = {
            ticketId: id
        }
        
        this.ticketService.changeStatus(ticketUpdateReqDto, true).subscribe({
            next: () => {
                this.ngOnInit()
            },
            error: () => {
                this.loading = false
            }
        })
    }

    getPriorities() {
        this.ticketPriorityService.getAll(true).subscribe(result => {
            this.priorities = result
        })
    }

    getProducts() {
        const profile = this.authService.getProfile()

        if (profile) {
            this.userId = profile.userId
        }
        this.subProductService.getAll(this.userId, true).subscribe(result => {
            this.products = result
        })
    }

    getTickets() {
        this.ticketService.getAll('', true).subscribe(result => {
            this.tickets = result
        })
    }

    getOpenTickets() {
        this.ticketService.getAll(StatusCode.OPEN, true).subscribe(result => {
            this.tickets = result
        })
    }
    
    getReOpenTickets() {
        this.ticketService.getAll(StatusCode.RE_OPEN, true).subscribe(result => {
            this.reOpenTickets = result
        })
    }

    changeStatusColor(statusCode: string): string {
        if (statusCode === StatusCode.OPEN || statusCode === StatusCode.RE_OPEN) {
            return "success"
        } else if (statusCode === StatusCode.PENDING_AGENT || statusCode === StatusCode.PENDING_CUSTOMER) {
            return "primary"
        } else if (statusCode === StatusCode.ON_PROGRESS) {
            return "warning"
        } else {
            return 'primary'
        }
    }

    changePriorityColor(priortyCode: string): string {
        if (priortyCode === PriorityCode.HIGH) {
            return "danger"
        } else if (priortyCode === PriorityCode.MEDIUM) {
            return "warning"
        } else {
            return "primary"
        }
    }

    showDetail(id: number, statusCode: string) {
        this.loading = true
        let ticketUpdateReqDto: TicketUpdateStatusReqDto = { ticketId: id }

        if (this.accountRoleCode === RoleCode.DEVELOPER && statusCode === StatusCode.PENDING_AGENT) {
            this.ticketService.changeStatus(ticketUpdateReqDto, true).subscribe(result => {
                this.router.navigateByUrl(`/tickets/detail/${id}`)
            })
        } else {
            this.router.navigateByUrl(`/tickets/detail/${id}`)
        }
    }

    createTicket() {
        this.loading = true
        const data = this.ticketReqDto.getRawValue()
        this.ticketService.createTicket(data, true).subscribe({
            next: () => {
                this.getTickets()
                this.visible = false
                this.loading = false
                this.ticketReqDto.reset()
            },
            error: () => {
                this.loading = false
            }
        })
    }

    fileUpload(event: any, fileUpload: FileUpload) {
        this.fileLists.clear()
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                this.fileLists.push(this.fb.control({
                    files: result.substring(result.indexOf(",") + 1, result.length),
                    fileFormat: file.name.substring(file.name.indexOf(".") + 1, file.name.length)
                }))
            })
        }
        fileUpload.clear()
    }

    show() {
        this.visible = true
    }
}
