import React, {memo, useEffect, useMemo, useState} from 'react';
import {Box, Text, Theme} from "../../../utils/theme";
import {Header} from "../Header";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";
import {Dimensions, Image, ImageRequireSource, Platform, StyleSheet} from "react-native";
import {Card} from './Card';
import {interpolate} from "react-native-reanimated";
import {Icons, onShare} from "../../../constants";
import {Categories} from "./Categories";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BorderlessButton} from "react-native-gesture-handler";
import {Feather as Icon} from '@expo/vector-icons';
import {useTheme} from "@shopify/restyle";
import {useSelector} from "react-redux";
import {getCardsOutfit} from "../../../redux/selectors/outfits-selector";
import {getCountCartItems} from "../../../redux/selectors/cart-selector";


const asset = require('../../../../assets/patterns/outfitPattern.png')
const {width} = Dimensions.get('window')
const ratio = 276 / 374
const height = (ratio * width)
export type CardType = { id: number, source: ImageRequireSource, label: string }
export const OutfitIdeas = memo(({navigation}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'OutfitIdeas'>) => {
    const cards = useSelector(getCardsOutfit)
    const theme = useTheme<Theme>()
    const countCart = useSelector(getCountCartItems)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsLabel, setCardsLabel] = useState<string[]>([])
    const [currentCards, setCurrentCards] = useState<CardType[]>([])
    const insets = useSafeAreaInsets()
    const icons: { name: Icons, onPress: () => void }[] = useMemo(() => ([
        {
            name: 'arrow-left',
            onPress: () => {
                if (currentIndex > 0) {
                    setCurrentIndex(c => c - 1)
                }
            }
        },
        {
            name: 'share',
            onPress: () => onShare()
        },
        {
            name: 'arrow-right',
            onPress: () => {
                if (currentIndex < currentCards.length - 1) {
                    setCurrentIndex(c => c + 1)
                }
            }
        }
    ]), [currentIndex, currentCards])
    useEffect(() => {
        const filterCards = [] as CardType[]
        cardsLabel.forEach(label => {
            return cards.forEach(card => {
                if (card.label === label) {
                    filterCards.push(card)
                }
            })
        })
        setCurrentCards([...filterCards])
        if(currentIndex === cardsLabel.length && cardsLabel.length) {
            setCurrentIndex(c => c - 1)
        }
    }, [cardsLabel])
    return (
        <Box backgroundColor={'mainBg'} flex={1}>
            <Box>
                <Header label={'outfit ideas'} left={{icon: 'menu', onPress: () => navigation.openDrawer()}}
                        right={{icon: 'shopping-bag', onPress: () => navigation.navigate("Cart"), count: countCart}} darkMode
                        rounded/>
                <Categories cardsLabel={cardsLabel} setCardsLabel={setCardsLabel}/>
            </Box>
            <Box flex={1} alignItems={'center'} justifyContent={currentCards.length === 0  ? 'center' : undefined} style={{marginTop: 80}}>
                {currentCards.length === 0 &&
                    <Box backgroundColor={'mainBg'} paddingHorizontal={'l'} style={{padding: 20}} borderRadius={'s'}>
                        <Box alignItems={"center"}>
                            <Box justifyContent={'center'} mb={'l'} borderRadius={'xl'} alignItems={'center'} width={80} height={80} backgroundColor={'primaryOpacity'}>
                                <Icon name={'arrow-up'} size={35} color={theme.colors.primary}/>
                            </Box>
                        </Box>
                        <Text variant={'title'} lineHeight={28} textAlign={'center'} letterSpacing={1.5} color={'text'}
                              fontSize={28}>Select categories above for see outfit ideas</Text>
                    </Box>
                }
                {currentCards.map(({id, ...restProps}, i) => {
                    return (
                        currentIndex <= i &&
                        <Card linkProduct={() => navigation.push('Home', {
                            screen: 'Product',
                            params: {id: id}
                        })} {...restProps} setCurrentIndex={() => setCurrentIndex(c => c + 1)}
                              key={i} currentIndex={currentIndex} cardsLength={currentCards.length - 1}
                              position={interpolate(i, [currentIndex, currentCards.length - 1], [0, 1])}/>
                    )
                }).reverse()}
            </Box>
            {currentCards.length !== 0  &&
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Box flexDirection={'row'} mb={Platform.OS === 'android' ? 'm' : undefined} paddingHorizontal={'s'} borderRadius={'s'} width={190} height={50}
                         backgroundColor={'mainBg'} justifyContent={'space-between'} alignItems={'center'}>
                        {icons.map(({name, onPress}, i) => (
                            <BorderlessButton onPress={onPress} style={{
                                height: 50,
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} key={i}>
                                <Icon size={20} name={name} color={'#0C0D34'}/>
                            </BorderlessButton>
                        ))}
                    </Box>
                    <Box height={insets.bottom * 1.2}/>
                </Box>
            }
            <Box style={{zIndex: -1}} position={"absolute"} top={0} left={0} right={0} bottom={0}>
                <Box flex={1 / 2.8} style={{backgroundColor: '#BFEAF5'}}>
                    <Box backgroundColor={'mainBg'} position={'absolute'} top={0} left={0} right={0} bottom={0}
                         borderBottomRightRadius={'xl'}/>
                </Box>
                <Box flex={1 / 2.9}>
                    <Box flex={1} backgroundColor={'mainBg'}/>
                    <Box flex={1} backgroundColor={'text'}/>
                    <Image source={asset} style={{
                        width,
                        height, ...StyleSheet.absoluteFillObject,
                        top: -1,
                        borderBottomRightRadius: 120,
                        borderTopLeftRadius: 80
                    }}/>
                </Box>
                <Box flex={1 / 3.2} style={{backgroundColor: '#BFEAF5'}}>
                    <Box backgroundColor={'text'} position={'absolute'} top={0} left={0} right={0} bottom={0}
                         borderTopLeftRadius={'xl'}/>
                </Box>
            </Box>
        </Box>
    );
});
