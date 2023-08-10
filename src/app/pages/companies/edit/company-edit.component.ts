import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { AuthService } from "../../../services/auth.service";
import { CompanyService } from "../../../services/company.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'company-edit',
    templateUrl: './company-edit.component.html'
})
export class CompanyEditComponent implements OnInit {
    constructor(private companyService: CompanyService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: NonNullableFormBuilder) { }

    company?: CompanyResDto
    companyId!: number
    loading!: boolean

    companyUpdateReqDto = this.fb.group({
        companyId: [0, Validators.required],
        companyCode: ['', Validators.required],
        companyName: ['', Validators.required],
        companyPhone: ['', Validators.required],
        companyAddress: ['', Validators.required]
    })

    companyUpdatePhotoReqDto = this.fb.group({
        companyId: [0, Validators.required],
        file: ['', Validators.required],
        fileFormat: ['', Validators.required]
    })

    ngOnInit() {
        this.getCompanyId()
        this.getCompanyDetail()
    }

    getCompanyId() {
        this.activatedRoute.params.subscribe(result => {
            this.companyId = result['id']
            this.companyUpdateReqDto.patchValue({
                companyId: result['id']
            })

            this.companyUpdatePhotoReqDto.patchValue({
                companyId: result['id']
            })
        })
    }

    getCompanyDetail() {
        this.companyService.getDetail(this.companyId, true).subscribe(result => {
            this.company = result
            this.companyUpdateReqDto.patchValue({
                companyCode: result.companyCode,
                companyName: result.companyName,
                companyPhone: result.companyPhone,
                companyAddress: result.companyAddress
            })
        })
    }

    updateCompany() {
        this.loading = true
        const data = this.companyUpdateReqDto.getRawValue()
        this.companyService.updateCompany(data,true).subscribe({
            next: () => {
                this.router.navigateByUrl('/companies')
            },
            error: () => {
                this.loading = false
            }
        })
    }

    updateCompanyPhoto() {
        this.loading = true
        const data = this.companyUpdatePhotoReqDto.getRawValue()
        this.companyService.updateCompanyPhoto(data, true).subscribe({
            next: () => {
                this.router.navigateByUrl('/companies')
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

                this.companyUpdatePhotoReqDto.patchValue(
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