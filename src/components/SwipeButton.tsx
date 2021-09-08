import React, {useState} from 'react';
import {Box, Text, Theme} from "../utils/theme";
import {PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Animated, {
    interpolate, interpolateColor, runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle, useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";
import Svg, {G, Path, Rect} from "react-native-svg";
import {snapPoint} from "react-native-redash";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useTheme} from "@shopify/restyle";
import {Dimensions, Platform} from "react-native";
import * as Haptics from "expo-haptics";
import {AnimatedBox} from "../constants";

type Props = {
    setHeight?: (height: number) => void
    onEndedActionCallback: () => void
    bg?: keyof Theme["colors"]
    label: string
    success?: string
    disabled?: boolean
};
const AnimatedText = Animated.createAnimatedComponent(Text)
const {width} = Dimensions.get('window')
export const SwipeButton = ({
                                setHeight,
                                onEndedActionCallback,
                                bg = 'mainBg',
                                label,
                                success = 'Changes saved',
                                disabled=true
                            }: Props) => {
    const [currentDisabled, setCurrentDisabled] = useState(false)
    const insets = useSafeAreaInsets()
    const theme = useTheme<Theme>()
    const WIDTH_SWIPE = width - theme.spacing.l * 2
    const x = useSharedValue(0)
    const snapX = useSharedValue(0)
    const opacitySaved = useSharedValue(0)
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
        onStart: (_, ctx) => {
            ctx.startX = x.value
        },
        onActive: (e, {startX}) => {
            let newX = startX + e.translationX
            const minX = 0
            const maxX = WIDTH_SWIPE - 49
            if (newX <= minX) {
                x.value = minX
            } else if (newX >= maxX) {
                x.value = maxX
            } else {
                x.value = startX + e.translationX
            }
        },
        onEnd: ({translationX, velocityX}) => {
            const snapPointX = snapPoint(translationX, velocityX, [0, WIDTH_SWIPE - 49])
            snapX.value = snapPointX
            x.value = withSpring(snapPointX, {damping: 16})
        }
    })
    const onEnded = () => {
        if (snapX.value === WIDTH_SWIPE - 49) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            opacitySaved.value = 1
            onEndedActionCallback()
            setCurrentDisabled(true)
        } else {
            opacitySaved.value = 0
        }
    }
    const runOnJsDisabled = (args: boolean) => {
        setTimeout(() => setCurrentDisabled(args), 1750)
    }
    const opacitySavedSwipe = useAnimatedStyle(() => ({
        opacity: withDelay(snapX.value !== 0 ? 1000 : 500, withTiming(opacitySaved.value, {duration: 500}, () => {
            if (snapX.value !== 0) {
                x.value = withSpring(0, {damping: 17})
                opacitySaved.value = 0
                snapX.value = 0
                runOnJS(runOnJsDisabled)(false)
            }
        }))
    }))
    const translateX = useAnimatedStyle(() => ({
        transform: [{translateX: x.value}]
    }))
    const opacity = useAnimatedStyle(() => {
        const itpOpacity = interpolate(x.value, [0, (WIDTH_SWIPE * 0.75)], [1, 0])
        const opacity = withDelay(snapX.value !== 0 ? 250 : 500, withTiming(itpOpacity, {duration: 250}))
        return {
            opacity
        }
    })
    const backgroundColor = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(x.value, [0, (WIDTH_SWIPE * 0.3)], ['#2CB9B0', '#06818E'])
    }))
    return (
        <Box onLayout={e => {
            if (setHeight) setHeight(e.nativeEvent.layout.height)
        }} position={'absolute'} backgroundColor={bg}
             borderTopLeftRadius={'s'} borderTopRightRadius={'s'} bottom={0} alignItems={'center'}
             style={{
                 paddingVertical: insets.bottom,
                 paddingTop: insets.bottom - 5,
                 paddingBottom: Platform.OS === 'android' ? 20 : insets.bottom
             }}>
            <AnimatedBox style={[backgroundColor]} width={WIDTH_SWIPE} flex={1} height={50}
                         borderRadius={'xl'} alignItems={'center'} justifyContent={'center'}>
                <AnimatedText style={[opacity]} variant={'textBtn'} color={'mainBg'}>{label}</AnimatedText>
                <Box position={'absolute'}>
                    <AnimatedText style={[opacitySavedSwipe]} variant={'textBtn'}
                                  color={'mainBg'}>{success}</AnimatedText>
                </Box>
                <PanGestureHandler {...{onGestureEvent, onEnded}}>
                    <Animated.View style={[translateX, {position: 'absolute', top: 5, left: 0}]}>
                        <Svg
                            width={49}
                            height={48}
                            viewBox="0 0 49 48"
                        >
                            <G>
                                <Rect x={4} width={41} height={40} rx={20} fill="#fff"/>
                            </G>
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20 15.5a.5.5 0 011 0v9a.5.5 0 01-1 0v-9zm4 0a.5.5 0 011 0v9a.5.5 0 01-1 0v-9zm4.5-.5a.5.5 0 00-.5.5v9a.5.5 0 001 0v-9a.5.5 0 00-.5-.5z"
                                fill="#2CB9B0"
                            />
                        </Svg>
                    </Animated.View>
                </PanGestureHandler>
                {(!disabled || currentDisabled) &&
                    <Box position={'absolute'} backgroundColor={'registrationText'} left={0} right={0} top={0} bottom={0}
                         borderRadius={'xl'}/>
                }
            </AnimatedBox>
        </Box>
    );
};
