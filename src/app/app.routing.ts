import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseModule } from "./component/base/base.module";
import { BaseComponent } from "./component/base/base.component";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NotFoundComponent } from "./component/not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ButtonModule } from 'primeng/button';
import { authValidation, nonLoginAuthValidation } from "./validation/auth.validation";
import { SharedModule } from "./component/shared/shared.module";
import { ButtonComponent } from "./component/button/button.component";
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
    {
        component: BaseComponent,
        path: 'users',
        loadChildren: () => import('./pages/users/user.module').then(u => u.UserModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        component: BaseComponent,
        path: 'companies',
        loadChildren: () => import('./pages/companies/company.module').then(u => u.CompanyModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        component: BaseComponent,
        path: 'products',
        loadChildren: () => import('./pages/products/product.module').then(u => u.ProductModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        component: BaseComponent,
        path: 'sub-products',
        loadChildren: () => import('./pages/subscribe-product/sub-product.module').then(u => u.SubProductModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        component: BaseComponent,
        path: 'assign-pic',
        loadChildren: () => import('./pages/pic-assign/pic-assignment.module').then(u => u.PicAssignmentModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        component: BaseComponent,
        path: 'tickets',
        loadChildren: () => import('./pages/tickets/ticket.module').then(u => u.TicketModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        component: BaseComponent,
        path: 'assign-dev',
        loadChildren: () => import('./pages/dev-assign/dev-assignment.module').then(u => u.DevAssignmentModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        path: 'login',
        component: LoginComponent,
        canMatch: [ authValidation ]
    },
    {
        component: BaseComponent,
        path: 'dashboard',
        children: [
            {
                path: '',
                component: DashboardComponent
            }
        ],
        canMatch: [ nonLoginAuthValidation]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        LoginComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BaseModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        SharedModule,
        ToastModule,
        ButtonComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting {

}