import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyService } from "../../../services/company.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'company-create',
    templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent {

    loading!: boolean

    companyReqDto = this.fb.group({
        companyCode: ['', Validators.required],
        companyName: ['', Validators.required],
        companyPhone: ['', Validators.required],
        companyAddress: ['', Validators.required],
        files: ['', Validators.required],
        fileFormat: ['', Validators.required],
    })
    constructor(private companyService: CompanyService,
        private fb: NonNullableFormBuilder,
        private router: Router) { }


    createCompany() {
        this.loading = true
        const data = this.companyReqDto.getRawValue()
        this.companyService.createCompany(data, true).subscribe({
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

                this.companyReqDto.patchValue(
                    {
                        files: resultBase64,
                        fileFormat: resultExtension
                    }
                )
            })
        }

        fileUpload.clear()
    }
}