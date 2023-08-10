import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"
import { NavbarComponent } from "./navbar.component";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../../pipe/url.pipe";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[
        NavbarComponent
    ],
    imports: [
        RouterModule, CommonModule, UrlPipe, SharedModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {

}