import { RouterModule, Routes } from "@angular/router";
import { DevAssignmentComponent } from "./dev-assignment.component";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/component/shared/shared.module";
import { ButtonComponent } from "src/app/component/button/button.component";

const routes: Routes = [
    {
        path: '',
        component: DevAssignmentComponent
    }
]

@NgModule({
    declarations: [
        DevAssignmentComponent
    ], 
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule,
        SharedModule, ButtonComponent
    ],
    exports: [
        RouterModule,
        DevAssignmentComponent
    ]
})

export class DevAssignmentRouting{

}