import { CommonModule } from "@angular/common";
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from "@angular/core";
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        InputTextModule,
        MenubarModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        InputTextareaModule,
        FileUploadModule,
        PasswordModule,
        OverlayPanelModule,
        DividerModule,
        DialogModule,
        TagModule,
        ToastModule,
        TabViewModule,
        CardModule,
        AvatarModule
    ],
    exports: [
        CommonModule,
        InputTextModule,
        MenubarModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        InputTextareaModule,
        FileUploadModule,
        PasswordModule,
        OverlayPanelModule,
        DividerModule,
        DialogModule,
        TagModule,
        ToastModule,
        TabViewModule,
        CardModule,
        AvatarModule
    ]
})
export class SharedModule {

}