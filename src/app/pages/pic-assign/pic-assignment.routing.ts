import { Routes, RouterModule } from '@angular/router'
import { PicAssignmentComponent } from './pic-assignment.component'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/component/shared/shared.module'
import { ButtonComponent } from 'src/app/component/button/button.component'

const routes: Routes = [
    {
        path: '',
        component: PicAssignmentComponent
    }
]

@NgModule({
    declarations:[
        PicAssignmentComponent
    ], 
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule,
        SharedModule, ButtonComponent
    ],
    exports: [
        RouterModule,
        PicAssignmentComponent
    ]
})

export class PicAssignmentRouting {

}