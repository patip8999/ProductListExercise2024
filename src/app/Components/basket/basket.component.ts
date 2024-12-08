import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BasketState } from '../../Store/basket.state';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductModel } from '../../Models/product.model';
import { BasketActions } from '../../Store/basket.actions';
import { ButtonComponent } from "../../UI components/Buttons/button.component";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ButtonComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  readonly basketStore = inject(Store);
  readonly basketState$ = this.basketStore.select(BasketState.selectBasketState);
  readonly products$ = this.basketStore.select(BasketState.selectProducts);
  readonly totalValue$ = this.basketStore.select(BasketState.selectTotalValueForClient);

  // Funkcja do dodania produktu do koszyka
  onAddButtonCliced(product: ProductModel) {
    console.log(`${product.title} added to basket`);
    this.basketStore.dispatch(BasketActions.addProductToBasket({ product }));
  }

  // Funkcja do usunięcia produktu z koszyka
  onRemoveButtonClicked(productId: number) {
    console.log(`Product with ID ${productId} removed from basket`);
    this.basketStore.dispatch(BasketActions.removeProductFromBasket({ productId }));
  }
}