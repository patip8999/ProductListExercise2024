import { Component, inject, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Productservice } from "../../Services/product.service";
import { Observable } from "rxjs";
import { ProductModel } from "../../Models/product.model";
import { AsyncPipe } from "@angular/common";

@Component({
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [RouterModule, AsyncPipe]
})

export class ProductDetailComponent {
    
    private readonly productsService: Productservice = inject(Productservice); 
    public products$: Observable<ProductModel> = this.productsService.getOne('id'); 
   
    @Input( ) set id(value: string) {
        this.products$ = this.productsService.getOne(value)
    }
}