import * as React from 'react';
import {StyleSheet, Dimensions, Image} from "react-native";
import {FC} from "react";
import {Button} from "../../FormElements/Button";
import {Box, Text, Theme} from '../../../utils/theme';
import {useTheme} from "@shopify/restyle";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import {AppRoutes} from "../../../../App";
import {useSelector} from "react-redux";
import {getAssetWelcome} from "../../../redux/selectors/app-selector";


const {width, height: wHeight} = Dimensions.get('window')
export const SLIDE_HEIGHT = wHeight * 0.5
export const Welcome: FC<ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'Welcome'>> = ({navigation}) => {
    const theme = useTheme<Theme>()
    const data = useSelector(getAssetWelcome)
    const height = data.height / data.width * (width - 100)
    return (
        <Box style={{flex: 1}}>
            <Box borderBottomRightRadius={'xl'} style={styles.wrapperTopContent}>
                <Image source={data.src} style={{width: width - 100, height}}/>
            </Box>
            <Box style={styles.wrapperSubContent} backgroundColor={'mainBg'} borderTopLeftRadius={'xl'}>
                <Text variant={'title'} mb={'s'} style={styles.center}>Let’s get started</Text>
                <Text variant={'text'} mb={'xl'} style={styles.center}>Login to your account below or signup for an amazing experience</Text>
                <Button onPress={() => navigation.navigate('Login')} style={{marginBottom: theme.spacing.m}} variant={'primary'} label={'Have an account? Login'}/>
                <Button onPress={() => navigation.navigate('SignUp')} style={{marginBottom: theme.spacing.m}} variant={'default'} label={'Join us, it’s Free'}/>
                <Button onPress={() => navigation.navigate('ForgotPassword')} style={{marginBottom: theme.spacing.m}} variant={'transparent'} label={'Forgot password?'}/>
            </Box>
        </Box>
    );
};


const styles = StyleSheet.create({
    wrapperSubContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 44,
        paddingLeft: 44,
        width,
        flex: 1
    },
    wrapperTopContent: {
        height: SLIDE_HEIGHT,
        backgroundColor: '#F3F0EF',
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    center: {
        textAlign: 'center'
    }
})

