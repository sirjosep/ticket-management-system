import { RouterModule, Routes } from "@angular/router";
import { TicketListComponent } from "./list/ticket-list.component";
import { NgModule } from "@angular/core";
import { TicketDetailComponent } from "./detail/ticket-detail.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../../pipe/url.pipe";
import { SharedModule } from "src/app/component/shared/shared.module";
import { ButtonComponent } from "src/app/component/button/button.component";

const routes:Routes = [
    {
        path: '',
        component: TicketListComponent
    },
    {
        path: 'detail/:id',
        component: TicketDetailComponent
    }
]

@NgModule({
    declarations:[
        TicketListComponent,
        TicketDetailComponent
    ], 
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule,
        UrlPipe, SharedModule, ButtonComponent
    ],
    exports: [
        RouterModule,
        TicketListComponent,
        TicketDetailComponent
    ]
})

export class TicketRouting{

}