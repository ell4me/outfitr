import React, {Children, FC, useState} from 'react';
import {Box, Text, Theme} from '../../../utils/theme'
import {BorderlessButton} from "react-native-gesture-handler";
import {Dimensions, StyleSheet} from "react-native";
import {useTheme} from "@shopify/restyle";
import {mix, useTransition} from "react-native-redash/lib/module/v1";
import Animated from 'react-native-reanimated';


const {width} = Dimensions.get('window')
export const Tabs: FC = ({children}) => {
    const theme = useTheme<Theme>()
    const [active, setActive] = useState(true)
    const anim = useTransition(active, {duration: 400})
    const start = (width - theme.spacing.l * 2) / 5
    const end = start * 4
    const translateX = mix(anim, end, start)
    const translateXContent = mix(anim, 0, -width)
    return (
        <Box paddingHorizontal={'l'} flex={1}>
            <Box flexDirection={'row'} justifyContent={'space-between'} style={{paddingBottom: 15}}>
                <BorderlessButton onPress={() => setActive(true)}>
                    <Text variant={'title'} fontSize={20} color={active ? 'text' : 'total'}>Configuration</Text>
                </BorderlessButton>
                <BorderlessButton onPress={() => setActive(false)}>
                    <Text variant={'title'} fontSize={20} color={!active ? 'text' : 'total'}>Personal info</Text>
                </BorderlessButton>
                <Animated.View
                    style={[styles.circle, {transform: [{translateX}], backgroundColor: theme.colors.primary}]}/>
            </Box>
            <Animated.View style={{transform: [{translateX: translateXContent}], flex:1, paddingTop: 30, flexDirection: 'row', width: (width * 2) - theme.spacing.l * 4}}>
                {Children.map(children, child => <Box width={width}>{child}</Box>)}
            </Animated.View>
        </Box>
    );
};


const styles = StyleSheet.create({
    circle: {
        ...StyleSheet.absoluteFillObject,
        top: undefined,
        width: 6,
        height: 6,
        borderRadius: 20
    }
})
