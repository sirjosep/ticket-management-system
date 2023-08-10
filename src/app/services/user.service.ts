import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersResDto } from "../dto/user/users.res.dto";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { UserInsertReqDto } from "../dto/user/user-insert.req.dto";
import { ProfileRestDto } from "../dto/profile/profile.res.dto";
import { ProfileUpdateReqDto } from "../dto/profile/profile-update.req.dto";
import { ProfilePhotoUpdateReqDto } from "../dto/profile/profile-photo-update.req.dto";
import { UpdatePhotoResDto } from "../dto/update-photo.res.dto";
import { ChangePasswordReqDto } from "../dto/user/change-password.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private base: BaseService) { }

    getAll(roleCode:String, withToken: boolean): Observable<UsersResDto[]> {
        if(roleCode === ''){
            return this.base.get<UsersResDto[]>(`http://localhost:8080/users`, withToken)
        } else {
            return this.base.get<UsersResDto[]>(`http://localhost:8080/users/?roleCode=${roleCode}`, withToken)
        }
    }

    getProfile(withToken: boolean): Observable<ProfileRestDto> {
        return this.base.get<ProfileRestDto>(`http://localhost:8080/users/detail`, withToken)
    } 
    
    update(data: ProfileUpdateReqDto, withToken: boolean): Observable<ProfileUpdateReqDto> {
        return this.base.put<ProfileUpdateReqDto>(`http://localhost:8080/users`, data, withToken)
    } 

    updatePhoto(data: ProfilePhotoUpdateReqDto, withToken: boolean): Observable<UpdatePhotoResDto> {
        return this.base.patch<UpdatePhotoResDto>(`http://localhost:8080/users`, data, withToken)
    }

    changePassword(data: ChangePasswordReqDto, withToken: boolean): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`http://localhost:8080/users/change-password`, data, withToken)
    }

    createUser(data: UserInsertReqDto, withToken: boolean): Observable<UserInsertReqDto> {
        return this.base.post<UserInsertReqDto>('http://localhost:8080/users', data, withToken)
    }
}