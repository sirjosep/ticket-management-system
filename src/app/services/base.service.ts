import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: "root",
})
export class BaseService {
    constructor(private http: HttpClient,
        private auth: AuthService,
        private message: MessageService,
        private router: Router) { }

    private get token(): string | null {
        const profile = this.auth.getProfile()

        if (profile && profile.token) {
            return profile.token
        }

        return null
    }

    private get header() {
        return {
            headers:
            {
                Authorization: `Bearer ${this.token}`
            }
        }
    }

    post<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.post<T>(url, body, (withToken ? this.header : undefined))
            .pipe(response(this.router, this.message))
    }

    patch<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.patch<T>(url, body, (withToken ? this.header : undefined))
            .pipe(response(this.router, this.message))
    }

    put<T>(url: string, body: any, withToken = true): Observable<T> {
        return this.http.put<T>(url, body, (withToken ? this.header : undefined))
            .pipe(response(this.router, this.message))
    }

    get<T>(url: string, withToken = true): Observable<T> {
        return this.http.get<T>(url, (withToken ? this.header : undefined))
            .pipe(response(this.router, this.message))
    }
}

function response<T>(router: Router, message: MessageService) {
    return tap<T>({
        next: (data) => {
            if (data && (data as any).msg) {
                message.add({
                    severity: "success",
                    summary: "Success",
                    detail: (data as any).msg
                })
            }
        },
        error: (err) => {
            if (err && err.error && err.error.message) {
                message.add({
                    severity: "error",
                    summary: "Error",
                    detail: err.error.message
                })
            }

            if (err.status == 401 && err.error.message === 'Token Expired') {
                localStorage.clear()
                router.navigateByUrl('/login')
            }
        }
    })
}