import React, {useMemo} from 'react';
import {Dimensions, ImageRequireSource, StyleSheet, TouchableOpacity} from "react-native";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {snapPoint} from "react-native-redash";

type Props = {
    position: number
    setCurrentIndex: () => void
    source: ImageRequireSource
    linkProduct: () => void
    currentIndex: number
    cardsLength: number
};
const {width} = Dimensions.get('window')
const CARD_WIDTH = width * 0.8
const CARD_HEIGHT = width * 1.1
export const Card = ({position,setCurrentIndex, source, linkProduct,currentIndex,cardsLength}: Props) => {
    const translateOffsetY = useMemo(() => interpolate(position, [0, 1], [0, -100]), [position]);
    const panX = useSharedValue(0)
    const panY = useSharedValue(0)
    const snapPointsX = [-CARD_WIDTH, 0, CARD_WIDTH]
    const snapPointX = useSharedValue(0)
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {startX: number; startY: number}>({
        onStart: (_, ctx) => {
            ctx.startX = panX.value
            ctx.startY = panY.value
        },
        onActive: (e, ctx) => {
            if(position === 0) {
                panX.value = ctx.startX + e.translationX
                panY.value = ctx.startY + e.translationY
            }
        },
        onEnd: ({translationX, velocityX}) => {
            if(position === 0) {
                snapPointX.value = snapPoint(translationX, velocityX, snapPointsX)
                panX.value = withSpring(snapPointX.value, {velocity: velocityX * 0.5})
                panY.value = withSpring(translateOffsetY)
            }
        }
    })
    const onEnded = () => {
        if(currentIndex === cardsLength && Math.abs(snapPointX.value) === CARD_WIDTH) {
            panX.value = withSpring(0)
        } else if (Math.abs(snapPointX.value) === CARD_WIDTH) {
            setTimeout(() => {
                setCurrentIndex()
            }, 300)
        }
    }

    const stylesAnim = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(position, [0, 1], ['#C9E9E7', '#74BCB8'])
        const scale = withSpring(interpolate(position, [0, 1], [1, 0.9]))
        const translateY = withSpring(panY.value + interpolate(position, [0, 1], [0, -60]))
        return {
            backgroundColor,
            transform: [{translateY}, {scale}, {translateX: panX.value}]
        }
    })
    const stylesImage = useAnimatedStyle(() => {
        const scale = withSpring(interpolate(position, [0, 1], [1, 0.8]))
        let opacity = 0
        if (position === 0) {
            opacity = withSpring(1, {velocity: 1})
        }
        return {
            opacity,
            transform: [{scale}]
        }
    })
    return (
        <PanGestureHandler {...{onEnded, onGestureEvent}}>
            <Animated.View
                style={[styles.card, stylesAnim]}>
                <TouchableOpacity style={{flex: 1}} onPress={() => linkProduct()}>
                    <Animated.Image style={[styles.image, stylesImage]} source={source} resizeMode={'contain'}/>
                </TouchableOpacity>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 30,
        overflow: "hidden",
        alignItems: 'center'
    },
    image: {
        borderBottomRightRadius: 30,
        flex: 1
    }
})
