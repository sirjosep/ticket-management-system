import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { BASE_URL } from "../../../constant/api.constant";
import { PriorityCode, RoleCode, StatusCode } from "../../../constant/enum.constants";
import { FileDto } from "../../../dto/file/file.dto";
import { TicketDetailResDto } from "../../../dto/ticket/ticket-detail.res.dto";
import { TicketUpdateStatusReqDto } from "../../../dto/ticket/ticket-update-status.req.dto";
import { TicketCommentResDto } from "../../../dto/ticketcomment/ticket-comment.res.dto";
import { AuthService } from "../../../services/auth.service";
import { TicketCommentService } from "../../../services/ticket-comment.service";
import { TicketService } from "../../../services/ticket.service";
import { UserService } from "../../../services/user.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'ticket-detail',
    templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {
    ticketDetail?: TicketDetailResDto
    ticketComments!: TicketCommentResDto[]
    ticketId!: number
    accountId!: number
    fileComments!: FileDto
    loading!: boolean
    loadingStatus!: boolean
    statusCode!: string
    priorityCode!: string

    constructor(private ticketService: TicketService,
        private ticketCommentService: TicketCommentService,
        private activatedRoute: ActivatedRoute,
        private auth: AuthService,
        private fb: NonNullableFormBuilder) { }


    ngOnInit() {
        this.getTicketId()
        this.getTicketDetail()
        this.getTicketComment()
        const profile = this.auth.getProfile()
        if(profile) {
            this.accountId = profile.userId
        }
    }

    getTicketId() {
        this.activatedRoute.params.subscribe(params => {
            this.ticketId = params['id']
        })
    }

    get fileLists() {
        return this.ticketCommentReqDto.get('files') as FormArray
    }

    ticketCommentReqDto = this.fb.group({
        ticketId: [0, Validators.required],
        ticketCommentBody: ['', Validators.required],
        files: this.fb.array([this.fileComments])
    })

    changeStatus(){
        let ticketUpdateReqDto: TicketUpdateStatusReqDto = {
            ticketId: this.ticketId
        }
        
        this.loadingStatus = true
        this.ticketService.changeStatus(ticketUpdateReqDto, true).subscribe({
            next: () => {
                this.getTicketDetail()
                this.loadingStatus = false
            },
            error: () => {
                this.loadingStatus = false
            }
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

    isPictureExist(id: number):boolean {
        return id != null
    }
    
    isPictureNotExist(id: number):boolean {
        return id == null
    }

    getTicketDetail() {
        this.ticketService.getDetail(this.ticketId, true).subscribe(result => {
            this.ticketDetail! = result
            this.statusCode = result.statusCode
            this.priorityCode = result.priorityCode
        })
    }

    getTicketComment() {
        this.ticketCommentService.getAll(this.ticketId, true).subscribe(result => {
            this.ticketComments = result
        })
    }

    showBubble(userId: number): string{
        if(this.accountId == userId){
            return "col-12 md:col-4 md:col-offset-8"
        } else {
            return "col-12 md:col-4"
        }
    }

    createComment() {
        this.loading = true
        const data = this.ticketCommentReqDto.getRawValue()
        data.ticketId = this.ticketId
        this.ticketCommentService.createComment(data, true).subscribe({
            next: () => {
                this.getTicketComment()
                this.loading = false
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
}