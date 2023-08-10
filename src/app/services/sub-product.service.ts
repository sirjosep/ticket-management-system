import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersResDto } from "../dto/user/users.res.dto";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { UserInsertReqDto } from "../dto/user/user-insert.req.dto";
import { SubscribedProductResDto } from "../dto/subproduct/subscribed-product.res.dto";
import { SubscribedProductReqDto } from "../dto/subproduct/subscribed-product.req.dto";

@Injectable({
    providedIn: "root"
})
export class SubProductService {
    constructor(private base: BaseService) { }

    getAll(userId: Number, withToken: boolean): Observable<SubscribedProductResDto[]> {
        if(userId == 0){
            return this.base.get<SubscribedProductResDto[]>(`http://localhost:8080/subs-product`, withToken)
        } else {
            return this.base.get<SubscribedProductResDto[]>(`http://localhost:8080/subs-product/?userId=${userId}`, withToken)
        }
    }
    
    subProduct(data: SubscribedProductReqDto, withToken: boolean): Observable<SubscribedProductReqDto> {
        return this.base.post<SubscribedProductReqDto>('http://localhost:8080/subs-product', data, withToken)
    }
}