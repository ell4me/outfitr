import {RootState} from "../store";

export const getCartProducts = (state: RootState) => state.products.productsCart
export const getCountCartItems = (state: RootState) => state.products.countCartItems
export const getCardsData = (state: RootState) => state.products.creditCardsData
