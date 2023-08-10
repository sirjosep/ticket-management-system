import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductUpdateReqDto } from "../../dto/product/product-update.req.dto";
import { ProductService } from "../../services/product.service";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

    productCode!: string 
    products!: ProductUpdateReqDto[]
    visible!: boolean
    visibleUpdate!: boolean

    constructor(private productService: ProductService, 
        private fb: NonNullableFormBuilder,
        private router: Router){}

    productInsertDto = this.fb.group({
        productCode: ['', Validators.required],
        productName: ['', Validators.required]
    })

    productUpdateDto = this.fb.group({
            productId: [0, Validators.required],
            productCode: ['', Validators.required],
            productName: ['', Validators.required]
        })

    ngOnInit(){
        this.getProducts()
    }

    getProducts() {
        this.productService.getAll(true).subscribe(result => {
            this.products = result
        })
    }

    showProductDetail(id: number, productCode: string, productName: string){
        this.visible = false 
        this.visibleUpdate = true
        this.productUpdateDto.patchValue({
            productId: id,
            productCode: productCode,
            productName: productName
        })

        this.productCode = productCode
    }

    createProduct(){
        const data = this.productInsertDto.getRawValue()
        this.productService.createProduct(data, true).subscribe(result => {
            this.getProducts()
            this.visible = false
        })
    }

    updateProduct(){
        const data = this.productUpdateDto.getRawValue()
        this.productService.updateProduct(data, true).subscribe(result => {
            this.getProducts()
            this.visibleUpdate = false
        })
    }
    
    showDialog(){
        this.visibleUpdate = false
        this.visible = true
    }
}