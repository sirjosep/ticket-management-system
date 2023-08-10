import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

    loading!: boolean

    constructor(private userService: UserService,
        private messageService: MessageService,
        private router: Router,
        private fb: NonNullableFormBuilder) { }

    changePasswordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required]
    });

    changePassword() {
        this.loading = true
        const data = this.changePasswordForm.getRawValue()
        if (data.newPassword == data.confirmNewPassword) {
            this.userService.changePassword(data, true).subscribe({
                next: () => {
                    localStorage.removeItem("data")
                    this.router.navigateByUrl("/login")
                },
                error: () => {
                    this.loading = false
                }
            })
        } else {
            this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Confirm password is wrong!"
            })
            this.loading = false
        }
    }
}