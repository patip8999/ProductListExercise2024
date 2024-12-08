import { createReducer, on } from "@ngrx/store";
import { BasketActions } from "./basket.actions";
import { BasketState } from "./basket.state";


const storedBasket = localStorage.getItem('basket');
const initialState: BasketState = storedBasket ? JSON.parse(storedBasket) : {
    products: [],
    totalValueForClient: 0
};

export const BasketReducer = createReducer(
    initialState,  
    on(BasketActions.addProductToBasket, (state, action) => {
        const updatedState = {
            ...state,
            products: [...state.products, action.product],
            totalValueForClient: state.totalValueForClient + action.product.price
        };
     
        localStorage.setItem('basket', JSON.stringify(updatedState));
        return updatedState;
    }),
    on(BasketActions.removeProductFromBasket, (state, action) => {
        const updatedProducts = state.products.filter(product => product.id !== action.productId);
        const removedProduct = state.products.find(product => product.id === action.productId);
        const updatedTotalValue = removedProduct ? state.totalValueForClient - removedProduct.price : state.totalValueForClient;

        const updatedState = {
            ...state,
            products: updatedProducts,
            totalValueForClient: updatedTotalValue
        };
   
        localStorage.setItem('basket', JSON.stringify(updatedState));
        return updatedState;
    })
);
