import {createSlice} from "@reduxjs/toolkit";
import {Theme} from "../../utils/theme";

const initialState = {
    cards: [
        {
            id: 0,
            source: require('../../../assets/models/11.png'),
            label: 'accessories'
        },
        {
            id: 1,
            source: require('../../../assets/models/8.png'),
            label: 'outlet'
        },
        {
            id: 2,
            source: require('../../../assets/models/10.png'),
            label: 'activewear'
        },
        {
            id: 3,
            source: require('../../../assets/models/3.png'),
            label: 'summer'
        },
        {
            id: 4,
            source: require('../../../assets/models/1.png'),
            label: 'newin'
        },
    ],
    categoriesData: [
        {
            name: 'New In',
            color: 'pink'
        },
        {
            name: 'Summer',
            color: 'avatarBg'
        },
        {
            name: 'Activewear',
            color: 'blue'
        },
        {
            name: 'Outlet',
            color: 'grey'
        },
        {
            name: 'Accessories',
            color: 'beige'
        },
    ] as CategoryType[],
    itemsFavourite: [
        {
            id: 1,
            color: 'blue',
            ratio: 1
        },
        {
            id: 2,
            color: 'avatarBg',
            ratio: 1.37
        },
        {
            id: 3,
            color: 'pink',
            ratio: 1.24
        },
        {
            id: 4,
            color: 'beige',
            ratio: 1.24
        },
        {
            id: 5,
            color: 'blue',
            ratio: 1.03
        },
        {
            id: 6,
            color: 'grey',
            ratio: 0.82
        },
        {
            id: 7,
            color: 'brown',
            ratio: 1.44
        },
        {
            id: 8,
            color: 'primaryOpacity',
            ratio: 1.1
        }
    ] as ItemFavouriteType[]
}

const reducer = createSlice({
    name: 'outfitIdeasReducer',
    initialState,
    reducers: {}
})

export const outfitsReducer = reducer.reducer

export type ItemFavouriteType = { id: number, color: keyof Theme['colors'], ratio: number }
export type CategoryType = {
    name: string,
    color: keyof Theme['colors']
}
