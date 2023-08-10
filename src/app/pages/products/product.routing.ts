import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './product-list.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/component/shared/shared.module'

const routes: Routes= [
    {
        path: '',
        component: ProductListComponent
    }
]

@NgModule({
    declarations:[
        ProductListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule,
        SharedModule
    ],
    exports: [
        RouterModule,
        ProductListComponent
    ]
})

export class ProductRouting {

}