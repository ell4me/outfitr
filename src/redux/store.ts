import {configureStore} from "@reduxjs/toolkit";
import {configReducer} from "./reducers/config-reducer";
import {appReducer} from "./reducers/app-reducer";
import {outfitsReducer} from "./reducers/outfits-reducer";
import {transactionsReducer} from "./reducers/transactions-reducer";
import {productsReducer} from "./reducers/products-reducer";



const rootReducer = {
    app: appReducer,
    outfitIdeas: outfitsReducer,
    configuration: configReducer,
    transactions: transactionsReducer,
    products: productsReducer
}


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
export type getStateType = typeof store.getState
