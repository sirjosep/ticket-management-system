import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { CompanyInsertReqDto } from "../dto/company/company-insert.req.dto";
import { CompanyUpdateReqDto } from "../dto/company/company-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { UpdatePhotoResDto } from "../dto/update-photo.res.dto";
import { CompanyUpdatePhotoReqDto } from "../dto/company/company-update-photo.req.dto";

@Injectable({
    providedIn: "root"
})
export class CompanyService {
    constructor(private base: BaseService) { }

    getAll(withToken: boolean): Observable<CompanyResDto[]> {
        return this.base.get<CompanyResDto[]>('http://localhost:8080/companies', withToken)
    }

    getDetail(id:number, withToken: boolean): Observable<CompanyResDto> {
        return this.base.get<CompanyResDto>(`http://localhost:8080/companies/detail/?id=${id}`, withToken)
    }

    createCompany(data: CompanyInsertReqDto, withToken: boolean): Observable<CompanyInsertReqDto> {
        return this.base.post<CompanyInsertReqDto>('http://localhost:8080/companies', data, withToken)
    }

    updateCompany(data: CompanyUpdateReqDto, withToken: boolean): Observable<UpdateResDto> {
        return this.base.put<UpdateResDto>('http://localhost:8080/companies', data, withToken)
    }

    updateCompanyPhoto(data: CompanyUpdatePhotoReqDto, withToken: boolean): Observable<UpdatePhotoResDto> {
        return this.base.patch<UpdatePhotoResDto>(`http://localhost:8080/companies`, data, withToken)
    }
}