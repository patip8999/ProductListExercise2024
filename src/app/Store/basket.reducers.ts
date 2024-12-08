import { createReducer, on } from "@ngrx/store";
import { BasketState } from "./basket.state";
import { BasketActions } from "./basket.actions";


const storedBasket = localStorage.getItem('basket');
const initialState = storedBasket ? JSON.parse(storedBasket) : BasketState.INIT_STATE;

export const BasketReducer = createReducer(
    initialState,  // Użyj stanu z localStorage (jeśli istnieje)
    on(BasketActions.addProductToBasket, (state, action) => {
        const updatedState = {
            ...state,
            products: [...state.products, action.product],
            totalValueForClient: state.totalValueForClient + action.product.price
        };
        localStorage.setItem('basket', JSON.stringify(updatedState));  // Zapisz stan koszyka
        return updatedState;
    })
);