import React from 'react';
import {Box} from '../../../utils/theme'
import {Header} from "../Header";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";
import {Switch} from "./Switch";
import {Dimensions, Image, StyleSheet} from 'react-native'
import {useSelector} from "react-redux";
import {getDataNotifications} from "../../../redux/selectors/app-selector";


const {width} = Dimensions.get('window')
const ratio = 368 / 375
const height = (width * ratio) - 50
export const Notifications = ({navigation}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'NotificationsSettings'>) => {
    const dataNotifications = useSelector(getDataNotifications)
    return (
        <Box flex={1} backgroundColor={'mainBg'}>
            <Box backgroundColor={'bgDrawer'} flex={1}>
                <Box position={'absolute'} borderBottomRightRadius={'xl'} left={0} right={0} top={0} bottom={0}
                     backgroundColor={'mainBg'}>
                    <Box mb={'xxxl'}>
                        <Header label={'Notifications'}
                                left={{icon: 'arrow-left', onPress: () => navigation.navigate('OutfitIdeas')}} darkMode
                                rounded/>
                    </Box>
                    <Box paddingHorizontal={'l'}>
                        {dataNotifications.map(({title, subTitle}, i) => <Switch key={i} {...{title, subTitle}}/>)}
                    </Box>
                </Box>
            </Box>
            <Box backgroundColor={'mainBg'} height={height}>
                <Image source={require('../../../../assets/patterns/patternNotifications.png')}
                       style={{borderTopLeftRadius: 80, ...StyleSheet.absoluteFillObject, width, height}}/>
            </Box>
        </Box>
    );
};
