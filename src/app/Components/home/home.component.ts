import { Component, inject, Signal, WritableSignal, signal, computed } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CategoriesService } from "../../Services/categories.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProductModel } from "../../Models/product.model";
import { Productservice } from "../../Services/product.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
    templateUrl: './home.component.html',
    standalone: true,
    imports:[RouterModule, CommonModule, FormsModule]
})

export class HomeComponent {
    categoriesService: CategoriesService = inject(CategoriesService);
    productService: Productservice = inject(Productservice);
    buttonColorr: string[] = ['#DDA0DD', '#DB7093', '#00BFFF', '#008B8B'];

    categoriesSignal: Signal<string[]> = toSignal(this.categoriesService.getAll(), { initialValue: []});
    productsSignal: Signal<ProductModel[]> = toSignal(this.productService.getAll(), { initialValue: []});

    isDetail: WritableSignal<boolean> = signal(false);
    VisibleProductId = signal<number | undefined>(undefined);
    isPriceVisible: WritableSignal<boolean> = signal(false); 
    sortOrder: WritableSignal<string> = signal('asc');
    filterText: WritableSignal<string> = signal('');
    isLoading: Signal<boolean> = computed(() => this.productsSignal() === null);

    FilteredAndSortedProducts: Signal<ProductModel[]> = computed(() => {
      const products = this.productsSignal();
      const filter = this.filterText().toLowerCase();
      const sortOrder = this.sortOrder();
      
      // Filtrowanie
      const filtered = products.filter(product => product.title.toLowerCase().includes(filter));

      // Sortowanie
      return filtered.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
    });
  
    selectedProduct = signal<ProductModel | undefined>(undefined);

    toggle() {
      this.isPriceVisible.update((isVisible) => !isVisible);
    }
  
    toggle2(productId: number, product: ProductModel) {
      this.VisibleProductId.set(productId);
      this.selectedProduct.set(product); // Użyj set do przypisania wartości sygnału
    }

    sort(sortBy: 'asc' | 'desc') {
      this.sortOrder.set(sortBy);
      console.log('Sort order set to:', sortBy);
      console.log('Current sort order:', this.sortOrder());
    }
}