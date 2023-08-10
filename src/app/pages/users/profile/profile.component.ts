import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ProfileRestDto } from "../../../dto/profile/profile.res.dto";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    loading!: boolean
    profile!: ProfileRestDto
    userId!: number
    email!: string
    companyName!: string
    roleName!: string

    constructor(private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private userService: UserService) { }

    ngOnInit() {
        this.getProfile()
        const profile = this.authService.getProfile()
        if (profile) {
            this.userId = profile.userId
        }
    }

    profileUpdateDto = this.fb.group({
        profileId: [0, [Validators.required]],
        profileName: ['', [Validators.required]],
        profilePhone: ['', [Validators.required]],
        profileAddress: ['', [Validators.required]]
    })

    profileUpdatePhotoDto = this.fb.group({
        profileId: [0, [Validators.required]],
        file: ['', Validators.required],
        fileFormat: ['', Validators.required]
    })

    getProfile() {
        this.userService.getProfile(true).subscribe(result => {
            this.profile = result
            this.profileUpdateDto.patchValue({
                profileName: result.name,
                profilePhone: result.phone,
                profileAddress: result.address
            })
            this.email = result.email
            this.companyName = result.companyName
            this.roleName = result.roleName
        })
    }

    updateProfile() {
        this.loading = true
        this.profileUpdateDto.patchValue({
            profileId: this.userId
        })

        const data = this.profileUpdateDto.getRawValue()
        this.userService.update(data, true).subscribe(result => {
            this.loading = false
        })
    }

    updatePhoto() {
        this.loading = true
        this.profileUpdatePhotoDto.patchValue({
            profileId: this.userId
        })

        const data = this.profileUpdatePhotoDto.getRawValue()
        this.userService.updatePhoto(data, true).subscribe(result => {
            const profile = this.authService.getProfile()
            if(profile) {
                profile.pictureId = result.fileId
                localStorage.setItem("data", JSON.stringify(profile))
            }

            this.loading = false
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

                this.profileUpdatePhotoDto.patchValue(
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