import { Component, AfterViewChecked, OnInit, ChangeDetectorRef } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { RoleResDto } from "../../../dto/role/role.res.dto";
import { CompanyService } from "../../../services/company.service";
import { RoleService } from "../../../services/role.service";
import { UserService } from "../../../services/user.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit, AfterViewChecked {
    roles!: RoleResDto[]
    companies!: CompanyResDto[]
    loading!: boolean

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private companyService: CompanyService,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef, private router: Router) { }


    userInsertReqDto = this.fb.group({
        email: ['', Validators.required],
        roleId: [0, Validators.required],
        companyId: [0, Validators.required],
        profileName: ['', Validators.required],
        profilePhone: ['', Validators.required],
        profileAddress: ['', Validators.required],
        file: '',
        fileFormat: ''
    })

    ngOnInit() {
        this.getRoles()
        this.getCompanies()
    }

    ngAfterViewChecked() {
        this.cd.detectChanges()
    }

    getRoles() {
        this.roleService.getAll(true).subscribe(result => {
            this.roles = result
        })
    }

    getCompanies() {
        this.companyService.getAll(true).subscribe(result => {
            this.companies = result
        })
    }

    createUser() {
        this.loading = true
        const data = this.userInsertReqDto.getRawValue()
        this.userService.createUser(data, true).subscribe({
            next: () => {
                this.router.navigateByUrl('/users')
                this.loading = false
            },
            error: () => {
                this.loading = false
            }
        })
    }
    fileUpload(event: any, fileUpload: FileUpload) {
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
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.userInsertReqDto.patchValue(
                    {
                        file: resultBase64,
                        fileFormat: resultExtension
                    }
                )
            })
        }

        fileUpload.clear()
    }
}