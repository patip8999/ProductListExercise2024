import { createReducer, on } from "@ngrx/store";
import { BasketState } from "./basket.state";
import { BasketActions } from "./basket.actions";


const storedBasket = localStorage.getItem('basket');
const initialState = storedBasket ? JSON.parse(storedBasket) : BasketState.INIT_STATE;

export const BasketReducer = createReducer(
    initialState,  // Użyj stanu z localStorage (jeśli istnieje)
    on(BasketActions.addProductToBasket, (state, action) => {
        console.log('current state before update', state);
        return {
            ...state,
            products: [...state.products, action.product],
            totaslValueForClient: state.totaslValueForClient + action.product.price
        };
    }),
    on(BasketActions.removeProductFromBasket, (state, action) => {
        const updatedProducts = state.products.filter((product: { id: number; }) => product.id !== action.productId);
        const removedProduct = state.products.find((product: { id: number; }) => product.id === action.productId);
        const updatedTotalValue = state.totaslValueForClient - (removedProduct ? removedProduct.price : 0);

        return {
            ...state,
            products: updatedProducts,
            totaslValueForClient: updatedTotalValue
        };
    })
);