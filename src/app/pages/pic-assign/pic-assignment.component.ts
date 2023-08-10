import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { PicAssignmentResDto } from "../../dto/assignment/pic-assignment.res.dto";
import { UsersResDto } from "../../dto/user/users.res.dto";
import { PicAssignService } from "../../services/pic-assign.service";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'pic-assignment',
    templateUrl: './pic-assignment.component.html'
})
export class PicAssignmentComponent implements OnInit {

    picAssigns!: PicAssignmentResDto[]
    customers!: UsersResDto[]
    pic!: UsersResDto[]
    visible!: boolean
    loading!: boolean

    constructor(private userService: UserService,
        private picAssignService: PicAssignService,
        private fb: NonNullableFormBuilder) { }

    picAssignReqDto = this.fb.group({
        picId: [0, Validators.required],
        custId: this.fb.array([
            [0, Validators.required]
        ])
    })

    ngOnInit() {
        this.getCustomers()
        this.getPic()
        this.getPicAssigns()
    }

    get inputs() {
        return this.picAssignReqDto.get('custId') as FormArray
    }

    onAdd() {
        this.inputs.push(this.fb.control(''))
    }

    onRemove(i: number) {
        this.inputs.removeAt(i)
    }

    getCustomers() {
        this.userService.getAll("CUST", true).subscribe(result => {
            this.customers = result
        })
    }

    getPic() {
        this.userService.getAll("PIC", true).subscribe(result => {
            this.pic = result
        })
    }

    getPicAssigns() {
        this.picAssignService.getAll(true).subscribe(result => {
            this.picAssigns = result
        })
    }

    assignPic(){
        this.loading = true
        const data = this.picAssignReqDto.getRawValue()
        this.picAssignService.assignPic(data, true).subscribe({
            next: () => {
                this.getPicAssigns()
                this.visible = false
                this.loading = false
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