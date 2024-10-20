import { Component, inject, Input } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Productservice } from "../../Services/product.service";
import { Observable, of } from "rxjs";
import { ProductModel } from "../../Models/product.model";
import { AsyncPipe, CommonModule } from "@angular/common";

@Component({
    templateUrl: './categories.component.html',
    standalone: true,
    imports: [RouterModule, AsyncPipe, RouterOutlet, CommonModule]
})
export class CategoriesComponent {
    categoryName: string = '';
    productsService: Productservice = inject(Productservice);
    products$: Observable<ProductModel[]> = of([]);
    @Input() set category(category: string) {
      this.categoryName = category;
      this.products$ = this.productsService.getAllInCategory(category);
    }

}