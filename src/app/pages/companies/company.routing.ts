import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyListComponent } from "./lists/company-list.component";
import { CompanyCreateComponent } from "./create/company-create.component";
import { CompanyEditComponent } from "./edit/company-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/component/shared/shared.module";
import { ButtonComponent } from "src/app/component/button/button.component";

const routes: Routes = [
    {
        path: '',
        component: CompanyListComponent
    },
    {
        path: 'new',
        component: CompanyCreateComponent
    },
    {
        path: 'edit/:id',
        component: CompanyEditComponent
    }
]

@NgModule({
    declarations: [
        CompanyListComponent,
        CompanyCreateComponent,
        CompanyEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule,
        SharedModule, ButtonComponent
    ], 
    exports: [
        RouterModule,
        CompanyListComponent,
        CompanyCreateComponent,
        CompanyEditComponent
    ]
})
export class CompanyRouting {

}