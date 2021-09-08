import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Icons} from "../../constants";
import {HomeRoutes} from "../../components/Home/HomeNavigation";
import {DispatchType} from "../store";
import {authAPI, updateAPI} from "../../api";
import firebase from "firebase";
import {saveInfoUserAfterAuth} from "./config-reducer";


const initialState = {
    slides: [
        {
            title: 'Relaxed',
            color: '#BFEAF5',
            subtitle: 'Find Your Outfits',
            desc: 'Confused about your outfit? Don’t worry! Find the best outfit here!',
            asset: {
                src: require('../../../assets/models/8.png'),
                width: 2748,
                height: 3685
            }
        },
        {
            title: 'Playful',
            color: '#BEECC4',
            subtitle: 'Hear it First, Wear it First',
            desc: 'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
            asset: {
                src: require('../../../assets/models/9.png'),
                width: 2306,
                height: 3337
            }
        },
        {
            title: 'Excentric',
            color: '#FFE4D9',
            subtitle: 'Your Style, Your Way',
            desc: ' Create your individual & unique style and look amazing everyday',
            asset: {
                src: require('../../../assets/models/5.png'),
                width: 4000,
                height: 6200
            }
        },
        {
            title: 'Funky',
            color: '#FFDDDD',
            subtitle: 'Look Good, Feel Good',
            desc: 'Discover the latest trends in fashion and explore your personality',
            asset: {
                src: require('../../../assets/models/6.png'),
                width: 2726,
                height: 4500
            }
        },
    ],
    assetWelcome: {
        src: require('../../../assets/models/4.png'),
        width: 2328,
        height: 2860
    },
    containerAssets: [
        require('../../../assets/patterns/0.png'),
        require('../../../assets/patterns/1.png'),
        require('../../../assets/patterns/2.png'),
        require('../../../assets/patterns/3.png')
    ] as const,
    menuItems: [
        {
            color: '#2CB9B0',
            icon: 'zap',
            label: 'Outfit Ideas',
            screen: 'OutfitIdeas'
        },
        {
            color: '#FE5E33',
            icon: 'heart',
            label: 'Favorite Outfits',
            screen: 'FavoriteOutfits'
        },
        {
            color: '#FFC641',
            icon: 'user',
            label: 'Edit Profile',
            screen: 'EditProfile'
        },
        {
            color: '#FF87A2',
            icon: 'clock',
            label: 'Transaction History',
            screen: 'TransactionHistory'
        },
        {
            color: '#442CB9',
            icon: 'settings',
            label: 'Notifications Settings',
            screen: 'NotificationsSettings'
        },
        {
            color: '#0C0D34',
            icon: 'log-out',
            label: 'Logout'
        },
    ] as MenuItem[],
    dataNotifications: [
        {
            title: 'Outfit Ideas',
            subTitle: 'Receive daily notifications'
        },
        {
            title: 'Discounts & Sales',
            subTitle: 'Buy the stuff you love for less'
        },
        {
            title: 'Stock Notifications',
            subTitle: 'If the product you 💜 comes back in stock'
        },
        {
            title: 'New Stuff',
            subTitle: 'Hear it first, wear it first'
        },
    ],
    errorApp: ''
}

const reducer = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        setErrorApp: (state, action:PayloadAction<{error: string}>) => {
            state.errorApp = action.payload.error
        }
    }
})


export const appReducer = reducer.reducer
const {setErrorApp}= reducer.actions

export const signUpUser = (email:string, password:string, redirect: () => void) => async (dispatch: DispatchType) => {
    try {
        const {uid} = await authAPI.signUp({email, password}) as firebase.UserInfo
        await updateAPI.setName(`User@${uid.substring(0, 6)}`)
        dispatch(setErrorApp({error: ''}))
        dispatch(saveInfoUserAfterAuth({id: uid}))
        redirect()
    } catch (error) {
        dispatch(setErrorApp({error: error.message}))
    }
}

export const signInUser = (email:string, password:string, redirect: () => void) => async (dispatch: DispatchType) => {
    try {
        await authAPI.signIn({email, password})
        dispatch(setErrorApp({error: ''}))
        redirect()
    } catch (error) {
        dispatch(setErrorApp({error: error.message}))
    }
}

export const resetPassword = (email: string, redirect: () => void) => async (dispatch: DispatchType) => {
    try {
        await authAPI.resetPassword(email)
        dispatch(setErrorApp({error: ''}))
        redirect()
    } catch (error) {
        dispatch(setErrorApp({error: error.message}))
    }
}

export const signOut = async () => {
    await authAPI.signOut()
}


type MenuItem = { color: string, icon: Icons, label: string, screen: keyof HomeRoutes }
