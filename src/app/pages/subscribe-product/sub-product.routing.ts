import { Routes, RouterModule } from '@angular/router'
import { SubProductListComponent } from './sub-product-list.component'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/component/shared/shared.module'
import { ButtonComponent } from 'src/app/component/button/button.component'

const routes: Routes = [
    {
        path: '',
        component: SubProductListComponent
    }
]


@NgModule({
    declarations: [
        SubProductListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule, CommonModule,
        SharedModule, ButtonComponent
    ],
    exports: [
        RouterModule,
        SubProductListComponent
    ]
})
export class SubProductRouting {

}