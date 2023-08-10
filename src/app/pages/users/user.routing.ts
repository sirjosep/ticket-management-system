import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./lists/user-list.component";
import { UserCreateComponent } from "./create/user-create.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../component/button/button.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoleCode } from "../../constant/enum.constants";
import { roleValidation } from "../../validation/role.validation";
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from "src/app/component/shared/shared.module";

const routes:Routes = [
    {
        path: '',
        component: UserListComponent,
        data: [RoleCode.ADMIN],
        canMatch: [roleValidation]
    },
    {
        path: 'new',
        component: UserCreateComponent,
        data: [RoleCode.ADMIN],
        canMatch: [roleValidation]
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    }
]

@NgModule({
    declarations: [
        UserListComponent,
        UserCreateComponent,
        ProfileComponent,
        ChangePasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule, 
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ButtonComponent
    ],
    exports: [
        RouterModule,
        UserListComponent,
        UserCreateComponent,
        ProfileComponent,
        ChangePasswordComponent
    ]
})

export class UserRouting {

}