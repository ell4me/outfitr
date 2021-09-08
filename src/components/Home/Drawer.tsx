import React from 'react';
import {Box, Theme, Text} from '../../utils/theme';
import {StyleSheet, Image, Dimensions} from "react-native";
import {useTheme} from "@shopify/restyle";
import {DrawerContentComponentProps, useIsDrawerOpen} from '@react-navigation/drawer';
import { Header } from './Header';
import {MenuItem} from "./MenuItem";
import {HomeRoutes} from "./HomeNavigation";
import { CommonActions } from '@react-navigation/native';
import {StatusBar} from "expo-status-bar";
import {useDispatch, useSelector} from "react-redux";
import {getMenuItems} from "../../redux/selectors/app-selector";
import {getInfoUser} from "../../redux/selectors/config-selector";
import {getCountCartItems} from "../../redux/selectors/cart-selector";
import {getItemsFavourite} from "../../redux/selectors/outfits-selector";
import {getTransactionsData} from "../../redux/reducers/transactions-reducer";
import {signOut} from "../../redux/reducers/app-reducer";


const {width} = Dimensions.get('window')
const asset = require('../../../assets/patterns/drawerPattern.png')
const ratio = 250 / 375
const height = width * ratio

export const Drawer = ({navigation}: DrawerContentComponentProps) => {
    const theme = useTheme<Theme>()
    const dispatch = useDispatch()
    const countCart = useSelector(getCountCartItems)
    const menuItems = useSelector(getMenuItems)
    const {name, mail} = useSelector(getInfoUser)
    const favOutfits = useSelector(getItemsFavourite)
    const transHistory = useSelector(getTransactionsData)
    const open = useIsDrawerOpen()
    return (
        <Box flex={1}>
            {open && <StatusBar style={'light'}/>}
            <Box flex={0.22} backgroundColor={'mainBg'}>
                <Box position={"absolute"} top={0} left={0} right={0} bottom={0} backgroundColor={'text'}
                     borderBottomRightRadius={'xl'}/>
                <Header label={'my profile'} left={{icon: 'x', onPress: () => navigation.closeDrawer()}}
                        right={{icon: 'shopping-bag', onPress: () => navigation.navigate("Cart"), count: countCart}}/>
            </Box>
            <Box flex={0.65}>
                <Box position={'absolute'} style={{width}} height={100} top={0}  backgroundColor={'text'}/>
                <Box position={'absolute'} style={{width}} height={100} bottom={0} backgroundColor={'bgDrawer'}/>
                <Box position={"absolute"} top={0} left={0} right={0} bottom={0} backgroundColor={'mainBg'}
                     borderBottomRightRadius={'xl'} borderTopLeftRadius={'xl'}/>
                <Box position={"absolute"} top={-50} left={width / 2 - 50} width={100} height={100} backgroundColor={'avatarBg'} borderRadius={'xl'}/>
                <Box style={{zIndex: 1}}>
                    <Box alignItems={'center'} style={{marginTop: 70, marginBottom: 32}}>
                        <Text variant={'title'} fontSize={28} mb={'xs'}>{name}</Text>
                        <Text variant={'text'} color={'registrationText'}>{mail}</Text>
                    </Box>
                    <Box paddingHorizontal={'l'} alignItems={'flex-start'}>
                        {menuItems.map((item, i) => {
                            const onPress = () => {
                                if(item.label !== 'Logout') {
                                    navigation.navigate<keyof HomeRoutes>(item.screen)
                                } else {
                                    dispatch(signOut)
                                    navigation.dispatch(CommonActions.reset({
                                        index: 1,
                                        routes: [
                                            {name: 'Auth'}
                                        ]
                                    }))
                                }
                            }
                            const condition = item.screen === 'TransactionHistory' && transHistory.length ?
                                transHistory.length : item.screen === 'FavoriteOutfits' && favOutfits.length ? favOutfits.length : undefined
                            return <MenuItem {...{onPress}} count={condition} key={i} {...item}/>
                        })}
                    </Box>
                </Box>
            </Box>
            <Box flex={0.12} backgroundColor={'mainBg'}>
                <Image source={asset}
                       style={{...StyleSheet.absoluteFillObject, borderTopLeftRadius: theme.borderRadii.xl, width, height}}/>
            </Box>
        </Box>
    );
};
