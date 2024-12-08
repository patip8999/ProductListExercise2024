import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductModel } from "../Models/product.model";

export interface BasketState {
    readonly products: ProductModel[];
    readonly totalValueForClient: number;  // Poprawiona nazwa
}

export namespace BasketState {
    export const INIT_STATE: BasketState = {
        products: [],
        totalValueForClient: 0  // Poprawiona nazwa
    };

    export const selectBasketState = createFeatureSelector<BasketState>('basket');
    export const selectProducts = createSelector(selectBasketState, (state: BasketState) => state.products);
    export const selectTotalValueForClient = createSelector(
        selectBasketState,
        (state: BasketState) => state.totalValueForClient // Poprawiona nazwa
    );
}