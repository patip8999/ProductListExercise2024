import { createAction, createActionGroup, props } from "@ngrx/store";
import { ProductModel } from "../Models/product.model";

export const BasketActions = createActionGroup({
    source: 'Basket',
    events: {
        'Add product to basket': props<{product: ProductModel}>(),
       
    }
});