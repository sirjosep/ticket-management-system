import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"
import { NavbarModule } from "../navbar/navbar.module";
import { BaseComponent } from "./base.component";

@NgModule({
    declarations: [
        BaseComponent
    ],
    imports: [
        NavbarModule, 
        RouterModule
    ]
})
export class BaseModule {

}