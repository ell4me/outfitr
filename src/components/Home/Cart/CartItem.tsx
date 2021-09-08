import React, {Dispatch, SetStateAction, useState} from 'react';
import {Box, Text} from '../../../utils/theme'
import {BorderlessButton} from "react-native-gesture-handler";
import {SwipeRow} from "./SwipeRow";
import {changeQuantityItem, ProductCartType} from "../../../redux/reducers/products-reducer";
import {Image} from 'react-native'
import {Size} from "./Cart";
import {useTiming} from "react-native-redash";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import {useDispatch} from "react-redux";

type Props = {
    data: ProductCartType
    setSize: Dispatch<SetStateAction<Size>>
    deleteItem: () => void
};
export const CartItem = ({data: {quantity, name, price, size, image, id}, setSize, deleteItem}: Props) => {
    const [hideLoad, setHideLoad] = useState(false)
    const anim = useTiming(hideLoad)
    const dispatch = useDispatch()
    const opacity = useAnimatedStyle(() => ({
        opacity: anim.value
    }))
    const changeQuantity = (action: 'add' | 'remove') => {
        if (action === 'remove' && quantity != 1) {
            dispatch(changeQuantityItem({id, size, quantity: quantity - 1}))
        } else if (action === 'add' && quantity !== 30) {
            dispatch(changeQuantityItem({id, size, quantity: quantity + 1}))
        }
    }
    return (
        <SwipeRow changeQuantity={changeQuantity} deleteItem={deleteItem}>
            <Box backgroundColor={'mainBg'} style={{paddingVertical: 15}} flex={1} paddingHorizontal={'l'}
                 flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Box flex={1} alignItems={'center'} flexDirection={'row'}>
                    <Box width={120} height={120} alignItems={'center'} justifyContent={'center'}
                         style={{borderRadius: 12, marginRight: 25}} backgroundColor={'blue'}>
                        <Animated.Image source={image} style={[opacity, {flex: 1}]} resizeMode={'contain'}
                               onLoad={() => setHideLoad(true)}/>
                        {!hideLoad && <Image style={{width: 60, height: 60, position: "absolute"}}
                                             source={require('../../../../assets/preloader.gif')}/> }
                    </Box>
                    <Box flex={1} pr={'xl'}>
                        <BorderlessButton onPress={() => setSize({id, size: [size]})}>
                            <Box flexDirection={'row'} alignItems={'center'} mb={'xs'}>
                                <Text variant={'text'} color={'text'} fontSize={12} lineHeight={12}>Size: </Text>
                                <Text variant={'title'} color={'primary'} fontSize={12}
                                      lineHeight={12}>{size.toUpperCase()}</Text>
                            </Box>
                        </BorderlessButton>
                        <Text variant={'title'} color={'text'} fontSize={16} mb={'s'} lineHeight={20}>{name}</Text>
                        <Text variant={'title'} color={'primary'} fontSize={18} lineHeight={20}>${price}</Text>
                    </Box>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'} width={30} height={30} borderRadius={'s'}
                     backgroundColor={'text'}>
                    <Text variant={'title'} color={'mainBg'} fontSize={12}>x{quantity}</Text>
                </Box>
            </Box>
        </SwipeRow>
    );
};
