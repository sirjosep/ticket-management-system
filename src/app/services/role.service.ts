import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { RoleResDto } from "../dto/role/role.res.dto";

@Injectable({
    providedIn: "root"
})
export class RoleService {
    constructor(private base: BaseService) { }

    getAll(withToken: boolean): Observable<RoleResDto[]> {
        return this.base.get<RoleResDto[]>('http://localhost:8080/roles', withToken)
    }
}