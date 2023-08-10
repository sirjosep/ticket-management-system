import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ProductUpdateReqDto } from "../../dto/product/product-update.req.dto";
import { SubscribedProductResDto } from "../../dto/subproduct/subscribed-product.res.dto";
import { UsersResDto } from "../../dto/user/users.res.dto";
import { ProductService } from "../../services/product.service";
import { SubProductService } from "../../services/sub-product.service";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'sub-product-list',
    templateUrl: './sub-product-list.component.html'
})
export class SubProductListComponent implements OnInit, AfterViewChecked {

    visible!: boolean
    loading!: boolean

    constructor(private fb: NonNullableFormBuilder,
        private productService: ProductService,
        private subProductService: SubProductService,
        private cd: ChangeDetectorRef,
        private userService: UserService) { }

    subProducts!: SubscribedProductResDto[]
    products!: ProductUpdateReqDto[]
    customers!: UsersResDto[]

    subscribedProductReqDto = this.fb.group({
        userId: [0, Validators.required],
        productId: this.fb.array([
            [0, Validators.required]
        ])
    })

    ngOnInit() {
        this.getProducts()
        this.getCustomers()
        this.getSubProducts()
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    get inputs() {
        return this.subscribedProductReqDto.get('productId') as FormArray
    }

    onAdd() {
        this.inputs.push(this.fb.control(''))
    }

    onRemove(i: number) {
        this.inputs.removeAt(i)
    }

    getProducts() {
        this.productService.getAll(true).subscribe(result => {
            this.products = result
        })
    }

    getCustomers() {
        this.userService.getAll("CUST", true).subscribe(result => {
            this.customers = result
        })
    }

    getSubProducts() {
        this.subProductService.getAll(0, true).subscribe(result => {
            this.subProducts = result
        })
    }

    subProduct() {
        this.loading = true
        if (this.subscribedProductReqDto.valid) {
            const data = this.subscribedProductReqDto.getRawValue()
            this.subProductService.subProduct(data, true).subscribe({
                next: () => {
                    this.getSubProducts()
                    this.loading = false
                    this.visible = false
                },
                error: () => {
                    this.loading = false
                }
            })
        }
    }

    showDialog() {
        this.visible = true
    }
}