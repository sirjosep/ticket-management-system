import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { CompanyService } from "../../../services/company.service";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
    constructor(private companyService: CompanyService,
        private router: Router) {}

    companies!: CompanyResDto[]
    company!: CompanyResDto

    ngOnInit() {
        this.getCompanies()
    }

    getCompanies() {
        this.companyService.getAll(true).subscribe(result => {
            this.companies = result
        })
    }

    showDetail(id: number) {
        this.router.navigateByUrl(`/companies/edit/${id}`)
    }
}