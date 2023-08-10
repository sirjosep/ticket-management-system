import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { DevAssignmentResDto } from "../dto/assignment/dev-assignment.res.dto";
import { DevAssignmentReqDto } from "../dto/assignment/dev-assignment.req.dto";

@Injectable({
    providedIn: 'root'
})
export class DevAssignService {

    constructor (private base: BaseService){}

    getAll(withToken: boolean): Observable<DevAssignmentResDto[]>{
        return this.base.get<DevAssignmentResDto[]>('http://localhost:8080/assign-devs', withToken)
    }

    assignDev(data: DevAssignmentReqDto, withToken: boolean){
        return this.base.post('http://localhost:8080/assign-devs', data, withToken)
    }
}