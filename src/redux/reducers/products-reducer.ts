import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ImageRequireSource} from "react-native";
enum CardType {
    'VISA',
    'MASTERCARD'
}

const initialState = {
    products: [
        {
            id: 4,
            name: 'Hoxton Woven Jacket',
            category: 'OVERSIZED JACKET',
            price: 39.99,
            desc1: "Step out in a street-ready look with this men's Hoxton Woven Tracksuit from Nike.",
            desc2: "In a blue colourway, this loose-fit suit is made from lightweight taffeta fabric with a knit mesh lining for a breathable feel.",
            sizes: ['s', 'm', 'l', 'xl', 'xxl'],
            mainImg: require('../../../assets/products/hoxton/black/big.png'),
            colors: [{
                src: require('../../../assets/products/hoxton/blue/small.png'),
                idProduct: 4.1
            }]
        },
        {
            id: 4.1,
            name: 'Hoxton Woven Jacket',
            category: 'OVERSIZED JACKET',
            price: 35.99,
            desc1: "Step out in a street-ready look with this men's Hoxton Woven Tracksuit from Nike.",
            desc2: "In a blue colourway, this loose-fit suit is made from lightweight taffeta fabric with a knit mesh lining for a breathable feel.",
            mainImg: require('../../../assets/products/hoxton/blue/big.png'),
            colors: [{
                src: require('../../../assets/products/hoxton/black/small.png'),
                idProduct: 4
            }]
        },
        {
            id: 0,
            name: 'Thom Browne',
            category: 'STRIPED TROUSERS',
            price: 849.99,
            desc1: "Striped trousers from Thom Browne. Invisible front closure, side pockets, two button welt back pockets, rolled hem and cropped length.",
            desc2: "Made In Italy",
            mainImg: require('../../../assets/products/thomBrowne/black.png'),
            colors: []
        },
        {
            id: 2,
            name: 'Borsalino',
            category: 'FELT HAT',
            price: 199.99,
            desc1: "Black wool felt hat from Borsalino.",
            desc2: "Country of origin: Italy",
            mainImg: require('../../../assets/products/borsalino/black.png'),
            colors: []
        },
        {
            id: 1,
            name: 'Tagliatore',
            category: 'BIKER JACKET',
            price: 359.99,
            desc1: "Notched lapels, offset front zip closure, long sleeves, two zip chest pockets, two side zip pockets and a straight hem.",
            desc2: "Brown color. Country of origin: Italy",
            mainImg: require('../../../assets/products/tagliatore/brown.png'),
            colors: []
        },
        {
            id: 3,
            name: 'MSGM',
            category: 'TIE CUFF JUMPER',
            price: 259.99,
            desc1: "Drawstring cuffs, grosgrain jersey, V-neck and long sleeves.",
            desc2: "Orange color. Country of origin: Italy",
            mainImg: require('../../../assets/products/msgm/orange.png'),
            colors: []
        }
    ],
    creditCardsData: [
        {
            type: CardType.VISA,
            number: '5467',
            expiration: '05/24',
            pattern: 1,
        },
        {
            type: CardType.MASTERCARD,
            number: '2604',
            expiration: '05/25',
            pattern: 2,
        },
        {
            type: CardType.VISA,
            number: '5153',
            expiration: '05/26',
            pattern: 3
        },
    ] as CreditCardType[],
    productsCart: [] as ProductCartType[],
    countCartItems: 0
}

const reducer = createSlice({
    name: 'productsReducer',
    initialState,
    reducers: {
        setProductsCart: (state, {payload}: PayloadAction<ProductCartType>) => {
            const includeItem = state.productsCart?.some(item => item.id === payload.id && item.size === payload.size)
            if (includeItem) {
                state.productsCart = state.productsCart.map(item => {
                    if (item.id === payload.id && item.size === payload.size) {
                        item.quantity++
                    }
                    return item
                })
            } else {
                state.countCartItems++
                state.productsCart.push(payload)
            }
        },
        updateSizeProduct: (state, action: PayloadAction<{ id: number | undefined, size: string }>) => {
            state.productsCart = state.productsCart.map(item => {
                if (item.id === action.payload.id) {
                    item.size = action.payload.size
                }
                return item
            })
        },
        removeProductFromCart: (state, {payload}) => {
            state.productsCart = state.productsCart.filter(({id, size}) => !(id === payload.id && size === payload.size))
            state.countCartItems--
        },
        changeQuantityItem: (state, action) => {
            state.productsCart = state.productsCart.map(item => {
                if(item.id === action.payload.id && action.payload.size === item.size) {
                    item.quantity = action.payload.quantity
                }
                return item
            })
        },
        clearCart: (state) => {
            state.countCartItems = 0
            state.productsCart = []
        }
    }
})


export const getProducts = (state: RootState) => state.products.products
export const {
    setProductsCart,
    updateSizeProduct,
    removeProductFromCart,
    changeQuantityItem,
    clearCart
} = reducer.actions
export const productsReducer = reducer.reducer




export type CreditCardType = {
    type: CardType
    number: string
    expiration: string
    pattern: 1 | 2 | 3
}
export type ProductCartType = {
    id: number
    size: string
    name: string
    price: number
    quantity: number
    image: ImageRequireSource
}
