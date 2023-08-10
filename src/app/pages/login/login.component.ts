import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms"
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    loading!: boolean
    loginReqDto = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', Validators.required]
    })

    constructor(private loginService: LoginService,
        private fb: NonNullableFormBuilder,
        private router: Router, private title: Title) {
        this.title.setTitle('Ticket Management System')
    }

    onLogin() {
        if (this.loginReqDto.valid) {
            this.loading = true
            const data = this.loginReqDto.getRawValue()
            this.loginService.login(data, false).subscribe({
                next: (result) => {
                    localStorage.setItem('data', JSON.stringify(result))
                    this.loading = false
                    this.router.navigateByUrl('/dashboard')
                },
                error: (error) => {
                    this.loading = false
                    console.log(error.message);
                }
            })
        }
    }
}