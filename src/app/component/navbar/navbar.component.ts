import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoleCode } from "../../constant/enum.constants";
import { AuthService } from "../../services/auth.service";
import { MenuItem } from "primeng/api"

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    imgUrl!: string
    accountRoleCode!: string
    items: MenuItem[] = []

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
        const profile = this.auth.getProfile()
        if (profile) {
            this.accountRoleCode = profile.roleCode
            if (profile.pictureId != null) {
                this.imgUrl = `http://localhost:8080/files/${profile.pictureId}`
            }
        }

        this.items = [
            {
                label: "Joe Ticket's",
                routerLink: '/dashboard'
            },
            {
                label: 'Master Data',
                items: [
                    {
                        label: 'User',
                        routerLink: '/users'
                    },
                    {
                        label: 'Company',
                        routerLink: '/companies'
                    },
                    {
                        label: 'Product',
                        routerLink: '/products'
                    }
                ],
                visible: this.isAdmin
            },
            {
                label: 'Ticket',
                routerLink: '/tickets',
                visible: this.isPic || this.isDeveloper || this.isCustomer
            }
        ]
    }

    get isAdmin(): boolean {
        return this.accountRoleCode == RoleCode.ADMIN
    }

    get isDeveloper(): boolean {
        return this.accountRoleCode == RoleCode.DEVELOPER
    }

    get isPic(): boolean {
        return this.accountRoleCode == RoleCode.PIC
    }

    get isCustomer(): boolean {
        return this.accountRoleCode == RoleCode.CUSTOMER
    }

    get isPictureExist(): boolean {
        return this.auth.getProfile()?.pictureId != null
    }

    get isPictureNotExist(): boolean {
        return this.auth.getProfile()?.pictureId == null
    }

    logout() {
        localStorage.removeItem("data")
        this.router.navigateByUrl("/login")
    }
}