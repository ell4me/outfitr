import React from 'react';
import {StyleSheet, Dimensions, Platform} from "react-native";
import {FC} from "react";
import {Box, Text} from '../../../utils/theme';

type Props = {
    title: string
    right: boolean
    height: number
};
const {width} = Dimensions.get('window')
export const Slide: FC<Props> = (props) => {
    return (
        <Box style={{flex: 1}}>
            <Box
                style={[styles.wrapperTitle, {
                    transform: [{translateY: (props.height - 100) / 2},
                        {translateX: props.right ? width / 2 - 50 : -width / 2 + 50},
                        {rotate: props.right ? '-90deg' : '90deg'}]
                }]}>
                <Text variant={'onBoardingTitle'} fontSize={Platform.OS === 'android' ? 65 : 80}>{props.title}</Text>
            </Box>
        </Box>
    );
};


const styles = StyleSheet.create({
    wrapperTitle: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

