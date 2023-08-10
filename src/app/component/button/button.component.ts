import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

@Component({
    selector: 'app-button',
    template: `
        <p-button label="{{ label }}" *ngIf="show" [loading]="loading" type="{{ btnType }}"
         styleClass="{{ classBtn }}" (click)= "clickBtn()" icon="{{ icon }}"></p-button>
    `,
    imports: [
        CommonModule,
        SharedModule
    ],
    standalone: true
})
export class ButtonComponent {
    @Input() label = ''
    @Input() classBtn = ''
    @Input() btnType = ''
    @Input() loading = false
    @Input() show = true
    @Input() icon = ''

    @Output() clickChange = new EventEmitter<void>();

    clickBtn() {
        this.clickChange.emit()
    }
}