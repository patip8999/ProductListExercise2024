import { Component, inject, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { CategoriesService } from './Services/categories.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from './UI components/Navbar/navbar.component';
import { Store } from '@ngrx/store';
import { BasketState } from './Store/basket.state';
import { ProductModel } from './Models/product.model';
import { BasketActions } from './Store/basket.actions';
export interface CatFactModel {
  readonly fact: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly categoriesService: CategoriesService = inject(CategoriesService); 
  public categoriesSignal: Signal<string[]> = toSignal(this.categoriesService.getAll(), { initialValue: [] }); 
  public buttonColorr: string[] = ['#DDA0DD', '#DB7093', '#00BFFF', '#008B8B']; 
  readonly basketStore = inject(Store);
  readonly products$ = this.basketStore.select(BasketState.selectProducts);  


  onAddButtonClicked(product: ProductModel) {
    this.basketStore.dispatch(BasketActions.addProductToBasket({ product }));
  }

}
