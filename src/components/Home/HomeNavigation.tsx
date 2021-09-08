import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {OutfitIdeas} from "./OutfitIdeas";
import {Drawer} from "./Drawer";
import {Dimensions} from "react-native";
import {FavoriteOutfits} from "./FavoriteOutfits";
import {TransactionHistory} from './TransactionHistory';
import {EditProfile} from "./EditProfile";
import {Notifications} from './Notifications';
import {Cart} from './Cart';
import {SuccessOrder} from "./Cart/SuccessOrder";
import {Product} from "./Product";
import {useAuthUser} from "../../hooks/useAuthUser";

const HomeDrawer = createDrawerNavigator<HomeRoutes>()
export type HomeRoutes = {
    OutfitIdeas: undefined
    FavoriteOutfits: undefined
    EditProfile: undefined
    TransactionHistory: undefined
    NotificationsSettings: undefined
    Cart: undefined
    SuccessOrder: undefined
    Product: {id: number} | undefined
}


const {width} = Dimensions.get('window')
export const HomeNavigation = () => {
    useAuthUser()
    return (
        <HomeDrawer.Navigator screenOptions={{swipeEnabled: false}} drawerContent={(props) => <Drawer {...props} />}
                              drawerStyle={{width}}>
            <HomeDrawer.Screen name={'OutfitIdeas'} component={OutfitIdeas}/>
            <HomeDrawer.Screen name={'FavoriteOutfits'} component={FavoriteOutfits}/>
            <HomeDrawer.Screen name={'TransactionHistory'} component={TransactionHistory}/>
            <HomeDrawer.Screen name={'EditProfile'} component={EditProfile}/>
            <HomeDrawer.Screen name={'NotificationsSettings'} component={Notifications}/>
            <HomeDrawer.Screen name={'Cart'} component={Cart}/>
            <HomeDrawer.Screen name={'SuccessOrder'} component={SuccessOrder}/>
            <HomeDrawer.Screen name={'Product'} component={Product}/>
        </HomeDrawer.Navigator>
    );
};
