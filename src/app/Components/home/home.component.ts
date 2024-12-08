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

import { ModalComponent } from '../../UI components/Modal/modal.component';
import { FilterPanelComponent } from '../../UI components/Filter-panel/filter-panel.component';
import { ButtonComponent } from '../../UI components/Buttons/button.component';
import { FooterComponent } from '../../UI components/Footer/footer.component';
import { CardComponent } from '../../UI components/Card/card.component';
import { Store } from '@ngrx/store';
import { BasketActions } from '../../Store/basket.actions';

@Component({
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    FooterComponent,
    ModalComponent,
    FilterPanelComponent,
    ButtonComponent,
    CardComponent
  ],
})
export class HomeComponent {
  private readonly productService: Productservice = inject(Productservice);
  public buttonColorr: string[] = ['#DDA0DD', '#DB7093', '#00BFFF', '#008B8B'];
  public products: ProductModel[] = [];
  private readonly basketStore: Store = inject(Store)

  public productsSignal: WritableSignal<ProductModel[]> = signal<
    ProductModel[]
  >([]);

  public isDetail: WritableSignal<boolean> = signal(false);
  public VisibleProductId = signal<number | undefined>(undefined);
  public isPriceVisible: WritableSignal<boolean> = signal(false);
  public sortOrder: WritableSignal<string> = signal('asc');
  public filterText: WritableSignal<string> = signal('');
  public isLoading: Signal<boolean> = computed(
    () => this.productsSignal() === null
  );

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

  linkUrl: string = 'https://example.com';
  linkText: string = 'Example Site';
  companyName: string = 'Example Corp';

  constructor() {
   
    this.productService.getAll().subscribe((products) => {
      this.productsSignal.set(products); 
    });
  }

  public deleteProduct(productId: number | undefined) {
    console.log('Usuwam produkt o ID:', productId);

    if (productId !== undefined) {
      this.productService.deleteProduct(productId.toString()).subscribe({
        next: () => {
          const currentProducts = this.productsSignal(); 
          const updatedProducts = currentProducts.filter(
            (product) => product.id !== productId
          );

        
          this.productsSignal.set(updatedProducts);
        },
        error: (err) => {
          console.error('Błąd przy usuwaniu produktu:', err);
        },
      });
    }
  }
  onAddButtonCliced(product: ProductModel) {
    console.log(`${product.title} added`);
    this.basketStore.dispatch(BasketActions.addProductToBasket({ product }));
  }
}
