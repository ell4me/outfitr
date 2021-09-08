import React, {useState} from 'react';
import {Box, Text, Theme} from "../../../utils/theme";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";
import {ScrollView} from "react-native-gesture-handler";
import {Dimensions, Image, TouchableOpacity} from "react-native";
import {Header} from "../Header";
import Svg, {Path} from "react-native-svg";
import {useTheme} from "@shopify/restyle";
import {SwipeButton} from "../../SwipeButton";
import {RadioRoundedGroup} from "../../RadioRoundedGroup";
import {useDispatch, useSelector} from "react-redux";
import {getConfigInfo} from "../../../redux/selectors/config-selector";
import {getProducts, setProductsCart} from "../../../redux/reducers/products-reducer";
import {getCountCartItems} from "../../../redux/selectors/cart-selector";


const {width} = Dimensions.get('window')
export const Product = ({navigation, route}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'Product'>) => {
    const {sizes} = useSelector(getConfigInfo)
    const products = useSelector(getProducts)
    const countCart = useSelector(getCountCartItems)
    const dispatch = useDispatch()
    const theme = useTheme<Theme>()
    const [hideLoad, setHideLoad] = useState(false)
    const [selectedSizes, setSelectedSizes] = useState([] as string[])
    const {
        colors, name, category,
        desc1, desc2, price, mainImg, id
    } = products.filter(item => item.id === route.params?.id)[0]

    const setConfigInfo =  (data: string[]) => setSelectedSizes([...data])
    const onEndedActionCallback = () => {
        dispatch(setProductsCart({id, size: selectedSizes[0], name, price, quantity: 1, image: mainImg}))
    }
    return (
        <Box flex={1} backgroundColor={'text'}>
            <Box flex={0.35} justifyContent={'flex-end'}>
                <Box position={'absolute'} backgroundColor={'product'} top={0} left={0} right={0} bottom={0}>
                    <Header left={{icon: 'arrow-left', onPress: () => navigation.goBack()}}
                            right={{
                                icon: 'shopping-bag', onPress: () => navigation.navigate('Cart'), count: countCart
                            }} darkMode rounded color={'rgba(250,250,250, .4)'}/>
                </Box>
            </Box>
            <Box flex={0.65} backgroundColor={'mainBg'} justifyContent={'flex-end'}>
                <Box width={width} height={80} backgroundColor={'text'}/>
                <Box position={'absolute'} overflow={'hidden'} backgroundColor={'mainBg'} top={0} left={0}
                     right={0}
                     bottom={0}
                     borderTopRightRadius={'xl'} borderBottomLeftRadius={'xl'}
                     borderBottomRightRadius={'xl'}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Box style={{paddingTop: 118, paddingBottom: 30}}>
                            <Box alignItems={'center'} paddingHorizontal={'l'}>
                                <Text mb={'s'} lineHeight={12} color={'registrationText'} variant={'title'}
                                      letterSpacing={1.5} fontSize={12}>{category}</Text>
                                <Text mb={'s'} color={'text'} variant={'title'} fontSize={28}>{name}</Text>
                                <Text mb={'m'} color={'primary'} variant={'title'} fontSize={28}>${price}</Text>
                            </Box>
                            <Box paddingHorizontal={'l'}>
                                <Text mb={'m'} variant={'text'} color={'registrationText'} fontSize={16}>{desc1}</Text>
                                <Text variant={'text'} color={'registrationText'} fontSize={16}>{desc2}</Text>
                            </Box>
                            <Box alignItems={'center'} mt={'l'} mb={'m'} paddingHorizontal={'l'}>
                                <Text variant={'title'} mb={'m'} color={'text'} fontSize={18}>Select your size</Text>
                                <RadioRoundedGroup checkbox data={sizes} setConfigInfo={setConfigInfo}/>
                            </Box>
                            {colors.length !== 0 &&
                                <>
                                    <Box alignItems={'center'}>
                                        <Text variant={'title'} mb={'m'} color={'text'} fontSize={18}>More colors
                                            available</Text>
                                    </Box>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                                style={{marginBottom: 20, marginHorizontal: theme.spacing.l}}>
                                        {colors.map(({idProduct, src}) => {
                                            return (
                                                <TouchableOpacity key={idProduct}
                                                                  onPress={() => {
                                                                      navigation.navigate('Product', {id: idProduct})
                                                                      setHideLoad(false)
                                                                  }}>
                                                    <Box style={{borderRadius: 10, marginRight: 15, marginTop: 5}}
                                                         overflow={'hidden'}
                                                         width={90} height={90} backgroundColor={'product'}
                                                         alignItems={'center'} justifyContent={'center'}>
                                                        <Image style={{flex: 1}} resizeMode={'contain'}
                                                               source={src}/>
                                                    </Box>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </>
                            }
                        </Box>
                    </ScrollView>
                </Box>
                <Box position={'absolute'} top={0}>
                    <Svg viewBox={`0 0 ${width} 80`}
                         width={width} height={theme.borderRadii.xl}>
                        <Path
                            d={`M 0 0 A 0 0 0 0 0 80 80 H ${width} V 160 A 0 0 0 0 0 ${width - 80} 80 L ${width} 0 V 80 H ${width - 80} L ${width} 0`}
                            fill={'#C9E9E7'}/>
                        <Box width={260} height={260} top={-180} left={width / 2 - 130} alignItems={'center'} justifyContent={'center'}>
                            <Image style={{flex: 1, opacity: !hideLoad ? 0 : 1}} resizeMode={'contain'}
                                   source={mainImg} onLoad={() => setHideLoad(true)}/>
                            {!hideLoad && <Image style={{width: 120, height: 120, position: "absolute"}}
                                   source={require('../../../../assets/preloader.gif')}/> }
                        </Box>
                    </Svg>
                    <Box position={'absolute'} right={0} top={80}>
                        <Svg viewBox={`0 0 1 1`}
                             width={theme.borderRadii.xl} height={theme.borderRadii.xl}>
                            <Path
                                d={`M 0 0 A 0 0 0 0 1 1 1 L 1 0`}
                                fill={'#C9E9E7'}/>
                        </Svg>
                    </Box>
                </Box>
            </Box>
            <Box flex={0.15} alignItems={'center'} justifyContent={'center'}>
                <SwipeButton disabled={!!selectedSizes.length} bg={'text'} success={'Added to bag'} label={'Swipe to add to bag'}
                             onEndedActionCallback={onEndedActionCallback}/>
            </Box>
        </Box>
    );
};
