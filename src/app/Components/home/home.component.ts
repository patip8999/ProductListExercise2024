import {
  Component,
  inject,
  Signal,
  WritableSignal,
  signal,
  computed,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../Services/categories.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductModel } from '../../Models/product.model';
import { Productservice } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
})
export class HomeComponent {
  private readonly productService: Productservice = inject(Productservice); 
  public buttonColorr: string[] = ['#DDA0DD', '#DB7093', '#00BFFF', '#008B8B']; 

  public productsSignal: Signal<ProductModel[]> = toSignal(
    this.productService.getAll(),
    { initialValue: [] }
  ); 

  public isDetail: WritableSignal<boolean> = signal(false); 
  public VisibleProductId = signal<number | undefined>(undefined);
  public isPriceVisible: WritableSignal<boolean> = signal(false); 
  public sortOrder: WritableSignal<string> = signal('asc'); 
  public filterText: WritableSignal<string> = signal('');
  public isLoading: Signal<boolean> = computed(() => this.productsSignal() === null); 

  public FilteredAndSortedProducts: Signal<ProductModel[]> = computed(() => { 
    const products = this.productsSignal();
    const filter = this.filterText().toLowerCase();
    const sortOrder = this.sortOrder();

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(filter)
    );

    return filtered.sort((a, b) => {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  });

  public selectedProduct = signal<ProductModel | undefined>(undefined); 

  public toggle(): void { 
    this.isPriceVisible.update((isVisible) => !isVisible);
  }

  public toggle2(productId: number, product: ProductModel): void {
    this.VisibleProductId.set(productId);
    this.selectedProduct.set(product);
  }

  public sort(sortBy: 'asc' | 'desc'): void { 
    this.sortOrder.set(sortBy);
    console.log('Sort order set to:', sortBy);
    console.log('Current sort order:', this.sortOrder());
  }
}