import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { FormComponent } from './Components/Form/form.component';
import { ProductDetailComponent } from './Components/Product-detail/product-detail.component';
import { CategoriesComponent } from './Components/Categories/categories.component';
import { BasketComponent } from './Components/basket/basket.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'form', 
        component: FormComponent,
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent
    },
    {
        path: 'category/:category',
        component: CategoriesComponent
    },
    {
        path: 'basket',
        component: BasketComponent
    }

];
