import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginReqDto } from "../dto/account/login.req.dto";
import { Observable } from "rxjs";
import { LoginResDto } from "../dto/account/login.res.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    constructor(private base: BaseService) { }

    login(data: LoginReqDto, withToken: boolean): Observable<LoginResDto> {
        return this.base.post<LoginResDto>('http://localhost:8080/login', data, withToken)
    }
}