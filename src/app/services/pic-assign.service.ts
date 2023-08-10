import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersResDto } from "../dto/user/users.res.dto";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { UserInsertReqDto } from "../dto/user/user-insert.req.dto";
import { SubscribedProductResDto } from "../dto/subproduct/subscribed-product.res.dto";
import { SubscribedProductReqDto } from "../dto/subproduct/subscribed-product.req.dto";
import { PicAssignmentResDto } from "../dto/assignment/pic-assignment.res.dto";
import { PicAssignmentReqDto } from "../dto/assignment/pic-assignment.req.dto";

@Injectable({
    providedIn: "root"
})
export class PicAssignService {
    constructor(private base: BaseService) { }

    getAll(withToken: boolean): Observable<PicAssignmentResDto[]> {
        return this.base.get<PicAssignmentResDto[]>(`http://localhost:8080/pic-assignments`, withToken)
    }
    
    assignPic(data: PicAssignmentReqDto, withToken: boolean): Observable<PicAssignmentReqDto> {
        return this.base.post<PicAssignmentReqDto>('http://localhost:8080/pic-assignments', data, withToken)
    }
}