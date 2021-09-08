import React, {RefObject, useEffect, useRef, useState} from 'react';
import {Box, Text, Theme} from '../../../utils/theme'
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";
import {Dimensions, Platform, StyleSheet} from "react-native";
import {Header} from "../Header";
import {CartItem} from './CartItem';
import Svg, {Path} from "react-native-svg";
import {useTheme} from '@shopify/restyle';
import {PanGestureHandler, PanGestureHandlerGestureEvent, ScrollView} from "react-native-gesture-handler";
import Animated, {
    interpolate,
    Transition, Transitioning, TransitioningView,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {snapPoint, useTiming} from "react-native-redash";
import {Checkout} from './Checkout';
import {SwipeBar} from "./SwipeBar";
import {ChangeSize} from "./ChangeSize";
import {useDispatch, useSelector} from "react-redux";
import {getCartProducts, getCountCartItems} from "../../../redux/selectors/cart-selector";
import {removeProductFromCart} from "../../../redux/reducers/products-reducer";
import {useSafeAreaInsets} from "react-native-safe-area-context";


const ratio = 700 / 380
const {width, height: sHeight} = Dimensions.get('window')
const height = ratio * width
const minHeight = 228 / 350 * width
export type Size = { id: number | undefined, size: string[] }
const transition = (
    <Transition.Sequence>
        <Transition.Out type="scale"/>
        <Transition.Change interpolation="easeInOut"/>
        <Transition.In type="fade"/>
    </Transition.Sequence>
);

export const Cart = ({navigation}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'Cart'>) => {
        const cartData = useSelector(getCartProducts)
        const countCart = useSelector(getCountCartItems)
        const animHeight = useTiming(!!countCart)
        const insets = useSafeAreaInsets()
        const dispatch = useDispatch()
        const ref = useRef() as RefObject<TransitioningView>;
        const theme = useTheme<Theme>()
        const [checkout, setCheckout] = useState(false)
        const [size, setSize] = useState<Size>({size: [], id: undefined})
        const y = useSharedValue(0)
        const snapPointYAnimated = useSharedValue(0)
        const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number }>(({
            onStart: (_, ctx) => {
                ctx.y = y.value
            },
            onActive: ({translationY}, ctx) => {
                let newY = ctx.y + translationY
                if (countCart) {
                    if (newY >= 0) {
                        y.value = 0
                    } else if (newY <= minHeight - height) {
                        y.value = -(height - minHeight)
                    } else {
                        y.value = ctx.y + translationY
                    }
                }
            },
            onEnd: ({velocityY}) => {
                if (countCart) {
                    const snapPointY = snapPoint(y.value, velocityY, [0, minHeight - height])
                    snapPointYAnimated.value = snapPointY
                    y.value = withSpring(snapPointY, {damping: 18})
                }
            },
        }), [countCart])
        const translateY = useAnimatedStyle(() => {
            return {
                transform: [{translateY: y.value}]
            }
        })
        const onBegan = () => {
            setCheckout(false)
        }
        const onEnded = () => {
            if (snapPointYAnimated.value === minHeight - height) {
                setCheckout(true)
            }
        }
        const style = useAnimatedStyle(() => ({
            height: interpolate(animHeight.value, [0, 1],
                [Platform.OS === 'android' ? sHeight + insets.top : sHeight, height])
        }))
        useEffect(() => {
            if (checkout) {
                y.value = withSpring(minHeight - height, {damping: 18})
            }
        }, [checkout])
        useEffect(() => {
            if (!cartData.length) {
                y.value = withSpring(0, {damping: 18})
                snapPointYAnimated.value = 0
            }
        }, [cartData])
        const deleteItem = (id: number, size: string) => {
            dispatch(removeProductFromCart({id, size}))
            ref.current?.animateNextTransition()
        }
        return (
            <Box flex={1} backgroundColor={'text'}>
                <Box position={'absolute'} bottom={0} left={0} right={0} top={minHeight}>
                    <Checkout successRedirect={() => navigation.navigate('SuccessOrder')} checkout={checkout}
                              setCheckout={() => setCheckout(true)}/>
                </Box>
                <PanGestureHandler {...{onGestureEvent, onBegan, onEnded}}>
                    <Animated.View
                        style={[translateY, style, {...StyleSheet.absoluteFillObject, backgroundColor: 'red'}]}>
                        <Box flex={0.15} justifyContent={'flex-end'}>
                            <Box position={'absolute'} backgroundColor={'primary'} top={0} left={0} right={0} bottom={0}>
                                <Header label={'edit profile'}
                                        left={{icon: 'arrow-left', onPress: () => navigation.goBack()}}
                                        right={{icon: 'shopping-bag', onPress: () => true, count: countCart}}
                                        roundedInvert/>
                            </Box>
                            <Box position={"absolute"} alignItems={'center'} flex={1} left={0} right={0}>
                                <Text textAlign={'center'} color={'mainBg'} variant={'title'}>{countCart} Items
                                    added</Text>
                            </Box>
                        </Box>
                        <Box flex={0.85} backgroundColor={'mainBg'}  justifyContent={'flex-end'} >
                            <Box width={width} height={80} backgroundColor={'text'} />
                            <Box position={'absolute'} overflow={'hidden'}  backgroundColor={'mainBg'} top={0} left={0}
                                 right={0}
                                 bottom={0}
                                 borderTopRightRadius={'xl'} borderBottomLeftRadius={'xl'} borderBottomRightRadius={'xl'}>
                                {cartData.length !== 0 ?
                                    <>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <Transitioning.View style={{flex: 1}} ref={ref} transition={transition}>
                                                <Box style={{paddingTop: 120, paddingBottom: 30}}>
                                                    {cartData.map(item => {
                                                        return (
                                                            <CartItem deleteItem={() => deleteItem(item.id, item.size)}
                                                                      key={`${item.id}_${item.size}`} setSize={setSize}
                                                                      data={item}/>
                                                        )
                                                    })}
                                                </Box>
                                            </Transitioning.View>
                                        </ScrollView>
                                        <SwipeBar/>
                                    </> : <Box justifyContent={'center'} alignItems={'center'} flex={1}>
                                        <Text variant={'title'} fontSize={32} lineHeight={32}>Cart is empty :(</Text>
                                    </Box>
                                }
                            </Box>
                            <Box position={'absolute'} top={0}>
                                <Svg viewBox={`0 0 ${width} 80`}
                                     width={width} height={theme.borderRadii.xl}>
                                    <Path
                                        d={`M 0 0 A 0 0 0 0 0 80 80 H ${width} V 160 A 0 0 0 0 0 ${width - 80} 80 L ${width} 0 V 80 H ${width - 80} L ${width} 0`}
                                        fill={'#2CB9B0'}/>
                                </Svg>
                                <Box position={'absolute'} right={0} top={80} zIndex={0}>
                                    <Svg viewBox={`0 0 1 1`}
                                         width={theme.borderRadii.xl} height={theme.borderRadii.xl}>
                                        <Path
                                            d={`M 0 0 A 0 0 0 0 1 1 1 L 1 0`}
                                            fill={'#2CB9B0'} id={'#clip'}/>
                                    </Svg>
                                </Box>
                            </Box>
                        </Box>
                    </Animated.View>
                </PanGestureHandler>
                <ChangeSize size={size} setSize={setSize}/>
            </Box>
        );
    }
;
