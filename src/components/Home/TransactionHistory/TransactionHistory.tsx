import React from 'react';
import {Box, Text, Theme} from "../../../utils/theme";
import {Header} from "../Header";
import {onShare} from "../../../constants";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";
import {Dimensions, Image, StyleSheet} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import {Graph} from "./Graph";
import {Transactions} from "./Transactions";
import Svg, {Path} from "react-native-svg";
import {useTheme} from "@shopify/restyle";
import moment from "moment";
import {useSelector} from "react-redux";
import {getTransactionsData} from "../../../redux/reducers/transactions-reducer";

const src = require('../../../../assets/patterns/transactionPattern.png')
const {width} = Dimensions.get('window')
const height = (218 / 375 * width) - 70

export const TransactionHistory = ({navigation}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'TransactionHistory'>) => {
    const maxX = moment().format('YYYY/MM/DD')
    const minX = moment(new Date(maxX)).subtract(6, 'months').subtract(1, 'days').toString()
    const transactionData = useSelector(getTransactionsData)
    let total = 0
    transactionData.forEach(item => total += item.value)
    const theme = useTheme<Theme>()
    return (
        <Box flex={1} backgroundColor={'mainBg'}>
            <Header label={'Transaction History'}
                    left={{icon: 'arrow-left', onPress: () => navigation.navigate('OutfitIdeas')}}
                    right={{icon: 'share', onPress: () => onShare()}} darkMode/>
            <Box flex={1} paddingHorizontal={'l'} borderBottomRightRadius={'xl'}>
                <Box marginTop={'l'} style={{marginBottom: 26}} justifyContent={'space-between'}
                     alignItems={'flex-end'} flexDirection={'row'}>
                    <Box>
                        <Text variant={'title'} fontSize={12} color={'total'}>TOTAL SPENT</Text>
                        <Text variant={'title'} fontSize={28} color={'text'}>${total.toFixed(2)}</Text>
                    </Box>
                    <RectButton style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 36,
                        width: 88,
                        borderRadius: 20,
                        backgroundColor: 'rgba(44,185,176, .1)'
                    }}>
                        <Text variant={'textBtn'} fontSize={14} color={'primary'}>All Time</Text>
                    </RectButton>
                </Box>
                <Graph minX={minX} maxX={maxX}/>
                <Transactions pb={height}/>
            </Box>
            <Box position={"absolute"} height={height} bottom={0} left={0} right={0}>
                <Svg viewBox={'0 0 1 1'} width={theme.borderRadii.xl} height={theme.borderRadii.xl} style={{position: 'absolute', right: 0, top: -80}}>
                    <Path d={'M 0 1 A 0 0 0 0 0 1 0 L 1 1'} fill={theme.colors.pattern}/>
                </Svg>
                <Image source={src}
                       style={{...StyleSheet.absoluteFillObject, width, borderTopLeftRadius: 80}}/>
            </Box>
        </Box>
    );
};
