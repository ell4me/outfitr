import React, {FC} from 'react';
import {Box, Text} from "../../../utils/theme";
import {AnimatedBox} from "../../../constants";
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {snapPoint} from "react-native-redash";
import {LinearGradient} from "expo-linear-gradient";
import { deg } from 'react-native-linear-gradient-degree';
import {Feather as Icon} from "@expo/vector-icons";

const {width} = Dimensions.get('window')
type Props = {
    deleteItem: () => void
    changeQuantity: (action: 'add' | 'remove') => void
};
export const SwipeRow: FC<Props> = ({children,deleteItem, changeQuantity}) => {
    const x = useSharedValue(0)
    const snapPointAnimatedX = useSharedValue(0)
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {x: number}>({
        onStart: (_, ctx) => {
            ctx.x = x.value
        },
        onActive: ({translationX},ctx) => {
            x.value = ctx.x + translationX
            const newX = ctx.x + translationX
            if(newX <= -80) {
                x.value = -80
            }
        },
        onEnd: ({velocityX}) => {
            const snapPointX = snapPoint(x.value, velocityX, [-80, 0, width])
            snapPointAnimatedX.value = snapPointX
            x.value= withSpring(snapPointX, {damping: 17})
        }
    })
    const onEnded = () => {
        if(snapPointAnimatedX.value === width) {
            deleteItem()
        }
    }
    const style = useAnimatedStyle(() => ({
        transform: [{translateX: x.value}]
    }))
    const deleteStyle = useAnimatedStyle(() => ({
        opacity: x.value > 0 ? 1 : 0
    }))
    const editStyle = useAnimatedStyle(() => ({
        opacity: x.value > 0 ? 0 : 1,
        zIndex: snapPointAnimatedX.value === 0 ? 0 : 1
    }))
    return (
        <Box>
            <AnimatedBox style={deleteStyle} position={'absolute'} width={160} top={0} bottom={0} left={0}>
                <LinearGradient {...deg(90)} locations={[0.6, 1]}  style={{...StyleSheet.absoluteFillObject, opacity: .1}} colors={['rgb(232,130,131)', 'rgba(255,230,230, .5)']}/>
                <Box justifyContent={'center'} alignItems={'center'} flex={1}>
                    <Text variant={'textBtn'} color={'danger'}>Remove</Text>
                </Box>
            </AnimatedBox>
            <AnimatedBox style={editStyle} position={'absolute'}  width={80} top={0} bottom={0} right={0}>
                <LinearGradient {...deg(315)} locations={[0.6, 1]} style={{...StyleSheet.absoluteFillObject, opacity: .6}} colors={['#DFF4FA', '#fff']}/>
                <Box justifyContent={'center'} alignItems={'center'} flex={1}>
                    <TouchableOpacity onPress={() => changeQuantity('add')} style={{justifyContent: 'center', alignItems: 'center' ,width: 30, height: 30, borderRadius: 15, marginBottom: 10, backgroundColor: '#2CB9B0'}}>
                        <Icon name={'plus'} size={18} color={'#fff'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeQuantity('remove')} style={{justifyContent: 'center', alignItems: 'center' ,width: 30, height: 30, borderRadius: 15, backgroundColor: '#EB5B90'}}>
                        <Icon name={'minus'} size={18} color={'#fff'}/>
                    </TouchableOpacity>
                </Box>
            </AnimatedBox>
            <PanGestureHandler activeOffsetX={[-10, 10]} {...{onGestureEvent, onEnded}}>
                <AnimatedBox style={[style]} backgroundColor={'orange'} flex={1}>
                    {children}
                </AnimatedBox>
            </PanGestureHandler>
        </Box>
    );
};
