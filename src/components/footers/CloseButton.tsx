import React from 'react';
import {BorderlessButton} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import {Box, Theme} from '../../utils/theme'
import {useTheme} from "@shopify/restyle";
import {Feather as Icon} from "@expo/vector-icons";


export const CloseButton = ({onPress}: {onPress: () => void}) => {
    const theme = useTheme<Theme>()
    return (
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
            <BorderlessButton {...{onPress}} style={[styles.container]}>
                <Icon  size={30} name={'x'} color={theme.colors.text}/>
            </BorderlessButton>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff'
    }
})
