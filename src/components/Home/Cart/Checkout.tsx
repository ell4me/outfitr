import React, {useEffect, useMemo, useState} from 'react';
import {Button} from '../../FormElements/Button';
import {Box, Text} from '../../../utils/theme'
import {AnimatedBox} from "../../../constants";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {CreditCard} from './CreditCard';
import {AddCreditCard} from './AddCreditCard';
import {Dimensions, Platform, ScrollView} from 'react-native';
import {interpolate, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {BorderlessButton} from "react-native-gesture-handler";
import {TotalItem} from "./TotalItem";
import {SwipeButton} from "../../SwipeButton";
import {useTiming} from "react-native-redash";
import {useDispatch, useSelector} from "react-redux";
import {getCardsData, getCartProducts} from "../../../redux/selectors/cart-selector";
import {clearCart} from "../../../redux/reducers/products-reducer";

type Props = {
    setCheckout: () => void
    checkout: boolean
    successRedirect: () => void
};
const {width} = Dimensions.get('window')
export const Checkout = ({checkout, setCheckout, successRedirect}: Props) => {
    const cartData = useSelector(getCartProducts)
    const cardsData = useSelector(getCardsData)
    const dispatch = useDispatch()
    const subtotal = useMemo(() => {
        let total = 0
        cartData.forEach(item => total+=item.price * item.quantity)
        return total
    }, [cartData]);
    const total = subtotal + 12
    const insets = useSafeAreaInsets()
    const anim = useTiming(checkout)
    const [active, setActive] = useState('5467')
    const x = useSharedValue(0)
    const translateX = useAnimatedStyle(() => {
        return {
            transform: [{translateX: withSpring(x.value, {damping: 10})}]
        }
    })
    useEffect(() => {
        cardsData.forEach((item, i) => {
            if (item.number === active) {
                x.value = 140 * i
            }
        })
    }, [cardsData, active])
    const opacity = useAnimatedStyle(() => ({
        transform: [{translateX: interpolate(anim.value, [0, 1], [0, -width])}]
    }))
    const opacityInvert = useAnimatedStyle(() => ({
        transform: [{translateX: interpolate(anim.value, [0, 1], [width, 0])}]
    }))
    const onEndedActionCallback = () => {
        setTimeout(() => {
            successRedirect()
            dispatch(clearCart())
        },2500)
    }
    return (
        <Box flex={1} style={{paddingBottom: insets.bottom * 1.5}}>
            <Box>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Box flex={1} paddingHorizontal={'l'} pt={'xl'} flexDirection={'row'}>
                        <AddCreditCard/>
                        <Box flex={1} flexDirection={'row'} style={{marginBottom: 16}}>
                            {cardsData.map((card) => {
                                return (
                                    <CreditCard data={card} active={active} setActive={() => setActive(card.number)}
                                                key={card.number}/>
                                )
                            })}
                            <AnimatedBox position={'absolute'} style={[translateX]} left={60} bottom={-16} width={6}
                                         height={6} borderRadius={'s'} backgroundColor={'primary'}/>
                        </Box>
                    </Box>
                </ScrollView>
                <Box paddingHorizontal={'l'}>
                    <Box alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'} pt={'m'}>
                        <Box flex={1}>
                            <Text variant={'title'} mb={'s'} fontSize={16} color={'mainBg'} lineHeight={24}>Delivery
                                address</Text>
                            <Text variant={'text'} mr={'xxxl'} fontSize={12} style={{color: 'rgba(255,255,255,.7)'}}>Unit
                                15, York Farm Business Centre, Watling St, Towcester</Text>
                        </Box>
                        <BorderlessButton>
                            <Text variant={'textBtn'} fontSize={14}
                                  style={{color: 'rgba(255,255,255,.3)'}}>Change</Text>
                        </BorderlessButton>
                    </Box>
                    <Box mt={'xl'}>
                        <TotalItem label={'Total Items'} cost={subtotal} totalItems={cartData.length}/>
                        <TotalItem label={'Standard Delivery'} cost={12}/>
                        <TotalItem label={'Total Payment'} cost={total}/>
                    </Box>
                </Box>
            </Box>
            <AnimatedBox style={[opacity]} mb={Platform.OS === 'android' ? 'm': undefined} paddingHorizontal={'l'} justifyContent={'flex-end'} flex={1}>
                <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Text variant={'text'} mb={Platform.OS === 'android' ? 'xs': undefined} fontSize={14} style={{color: 'rgba(255,255,255, .5)'}}
                              lineHeight={20}>Total
                            Payment:</Text>
                        <Text color={'mainBg'} variant={'title'} fontSize={20} lineHeight={20}>${subtotal.toFixed(2)}</Text>
                    </Box>
                    <Button onPress={setCheckout} label={'Go to checkout'} variant={'primary'}
                            style={{width: 180}}/>
                </Box>
            </AnimatedBox>
            <AnimatedBox style={[opacityInvert]} position={'absolute'} bottom={15} left={0} right={0}
                         justifyContent={'flex-end'} alignItems={'center'} flex={1}>
                <SwipeButton success={"Lets'go"} bg={'text'} label={`Swipe to Pay $${total.toFixed(2)}`}
                             onEndedActionCallback={onEndedActionCallback}/>
            </AnimatedBox>
        </Box>
    );
};
