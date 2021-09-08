import React, {FC, ReactNode} from 'react';
import {Dimensions, StyleSheet, Image, Platform} from "react-native";
import {Box, Theme} from '../utils/theme'
import {useTheme} from "@shopify/restyle";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StatusBar} from 'expo-status-bar';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useIsFocused} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {getContainerAssets} from "../redux/selectors/app-selector";

interface Props {
    footer?: ReactNode
    pattern: 0 | 1 | 2 | 3
    border?: 'none' | 'left'
    customFooterHeight?: number
}

const {width} = Dimensions.get('window')
const ratio = 200 / 375
const height = ratio * width
export const Container: FC<Props> = ({customFooterHeight = 190, border, pattern, children, footer}) => {
    const containerAssets = useSelector(getContainerAssets)
    const insets = useSafeAreaInsets()
    const theme = useTheme<Theme>()
    const isFocused = useIsFocused();
    return (
        <KeyboardAwareScrollView scrollEnabled={false} contentContainerStyle={styles.container}
                                 enableOnAndroid={true} enableAutomaticScroll={Platform.OS === 'ios'}>
            {isFocused && <StatusBar style={'light'}/>}
            <Box height={height * 0.7} overflow={"hidden"}
                 style={{
                     borderBottomLeftRadius: !border ? theme.borderRadii.xl : 0,
                     borderBottomRightRadius: border === 'left' ? theme.borderRadii.xl : 0
                 }}>
                <Image source={containerAssets[pattern]} style={{width, height}}/>
            </Box>
            <Box flex={1} overflow={'hidden'} backgroundColor={'text'}>
                <Image source={containerAssets[pattern]}
                       style={{width, height, ...StyleSheet.absoluteFillObject, top: -height * 0.7}}/>
                <Box flex={1} backgroundColor={'mainBg'} borderRadius={'xl'}
                     borderTopLeftRadius={!border ? 'none' : 'xl'}
                     borderTopRightRadius={!border ? 'xl' : border === 'none' ? 'xl' : 'none'}>
                    {children}
                </Box>
                {footer &&
                <Box style={{paddingBottom: Platform.OS === 'android' ? 20 : 0}} height={customFooterHeight}
                     justifyContent={'center'} alignItems={'center'}>
                    {footer}
                    <Box height={insets.bottom}/>
                </Box>
                }
            </Box>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff"
    }
})

