import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {PanGestureHandler, PanGestureHandlerGestureEvent, TouchableWithoutFeedback} from "react-native-gesture-handler";
import {SwipeBar} from "./SwipeBar";
import {Box, Text} from "../../../utils/theme";
import {AnimatedBox} from "../../../constants";
import {RadioRoundedGroup} from "../../RadioRoundedGroup";
import {SwipeButton} from "../../SwipeButton";
import {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {Dimensions} from "react-native";
import {snapPoint, useTiming} from "react-native-redash";
import {Size} from "./Cart";
import {useDispatch, useSelector} from "react-redux";
import {getConfigInfo} from "../../../redux/selectors/config-selector";
import {updateSizeProduct} from "../../../redux/reducers/products-reducer";


type Props = {
    size: Size,
    setSize: Dispatch<SetStateAction<Size>>
};
const {width, height} = Dimensions.get('window')
const minHeight = 228 / 350 * width
export const ChangeSize = ({size, setSize}: Props) => {
    const {sizes} = useSelector(getConfigInfo)
    const dispatch = useDispatch()
    const animSize = useTiming(!!size.size.length, {duration: 400})
    const snapPointSizeY = useSharedValue(0)
    const sizeY = useSharedValue(0)
    const [zIndex, setZIndex] = useState(false)
    const [selectedSizes, setSelectedSizes] = useState(size.size)
    const onEndedActionCallback = () => {
        setSize(c => ({...c, size: selectedSizes}))
        dispatch(updateSizeProduct({size: selectedSizes[0], id: size.id}))
    }
    const setConfigInfo = (data: string[]) => setSelectedSizes([...data])
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number }>(({
        onStart: (_, ctx) => {
            ctx.y = sizeY.value
        },
        onActive: ({translationY}, ctx) => {
            let newY = ctx.y + translationY
            if (newY <= 0) {
                sizeY.value = 0
            } else {
                sizeY.value = ctx.y + translationY
            }

        },
        onEnd: ({velocityY}) => {
            const snapPointY = snapPoint(sizeY.value, velocityY, [0, minHeight])
            snapPointSizeY.value = snapPointY
            sizeY.value = withSpring(snapPointY, {damping: 18})
        },
    }))
    const onEnded = () => {
        if (snapPointSizeY.value === minHeight) {
            setSize({id: undefined, size: []})
        }
    }
    useEffect(() => {
        if (size.size.length) {
            sizeY.value = withSpring(0, {damping: 15})
            setZIndex(true)
        } else {
            setTimeout(() => {
                setZIndex(false)
            }, 400)
        }
    }, [size.size])
    const translateY = useAnimatedStyle(() => {
        return {
            transform: [{translateY: sizeY.value}]
        }
    })
    const opacityLayer = useAnimatedStyle(() => ({
        opacity: animSize.value,
    }))
    return (
        <AnimatedBox zIndex={zIndex ? 1 : -1} flex={1} style={[opacityLayer]}>
            <TouchableWithoutFeedback style={{backgroundColor: 'rgba(12,13,52, .5)', height}}
                                      onPress={() => {
                                          sizeY.value = withSpring(minHeight)
                                          setSize({id: undefined, size: []})
                                      }}/>
            <PanGestureHandler {...{onGestureEvent, onEnded}}>
                <AnimatedBox style={[translateY]} position={'absolute'} left={0} right={0} bottom={0} width={width}
                             alignItems={'center'} height={minHeight}
                             backgroundColor={'mainBg'} borderTopRightRadius={'xl'} borderTopLeftRadius={'xl'}>
                    <SwipeBar top/>
                    <Text mt={'xxl'} style={{marginBottom: 30}} textAlign={'center'} variant={'title'}
                          lineHeight={24} fontSize={24}>Change item size</Text>
                    <Box style={{marginLeft: 18}}>
                        <RadioRoundedGroup setConfigInfo={setConfigInfo} checkbox data={sizes} padding
                                           initialData={size.size}/>
                    </Box>
                    <SwipeButton disabled={size.size[0] !== selectedSizes[0]} onEndedActionCallback={onEndedActionCallback} label={'Swipe to apply changes'}/>
                </AnimatedBox>
            </PanGestureHandler>
        </AnimatedBox>
    );
};
