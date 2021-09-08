import * as React from 'react';
import {StyleSheet, Animated} from "react-native";
import {FC} from "react";

type Props = {
    currentIndex: Animated.AnimatedDivision,
    index: number
};
export const Dot: FC<Props> = ({index, currentIndex}) => {
    const opacity = currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp'
    })
    const scale = currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 1.5, 1],
        extrapolate: 'clamp'
    })
    return (
        <Animated.View style={[styles.dot, {opacity, transform: [{scale}]}]}/>
    )
};


const styles = StyleSheet.create({
    dot: {
        width: 4,
        height: 4,
        marginHorizontal: 10,
        backgroundColor: '#2CB9B0',
        borderRadius: 100
    }
})

