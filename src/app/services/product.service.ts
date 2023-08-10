import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { ProductInsertReqDto } from "../dto/product/product-insert.req.dto";
import { ProductUpdateReqDto } from "../dto/product/product-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    constructor(private base: BaseService) { }

    getAll(withToken: boolean): Observable<ProductUpdateReqDto[]> {
        return this.base.get<ProductUpdateReqDto[]>('http://localhost:8080/products', withToken)
    }

    createProduct(data: ProductInsertReqDto, withToken: boolean): Observable<ProductInsertReqDto> {
        return this.base.post<ProductInsertReqDto>('http://localhost:8080/products', data, withToken)
    }

    updateProduct(data: ProductUpdateReqDto, withToken: boolean): Observable<UpdateResDto> {
        return this.base.put<UpdateResDto>('http://localhost:8080/products', data, withToken)
    }
}