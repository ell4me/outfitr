import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, Text} from "../../../utils/theme";
import {Dimensions, Image, ImageRequireSource} from "react-native";
import Carousel from "react-native-snap-carousel";
import {BorderlessButton} from "react-native-gesture-handler";
import {Feather as Icon} from "@expo/vector-icons";
import {DataOutfitGenerator} from "../../../redux/reducers/config-reducer";

type Props = {
    item: ConfigItemType
    setData: Dispatch<SetStateAction<DataOutfitGenerator>>
    index: number
    data: ItemType[]
};
const {width} = Dimensions.get('window')
const SIZE_ITEM = 160
export const GeneratorItem = ({item: {title, desc}, setData, index, data}: Props) => {
    const [selectedData, setSelectedData] = useState<string[]>([])
    useEffect(() => {
        if (selectedData.length) {
            switch (index) {
                case 0:
                    setData(c => ({...c, colors: selectedData}))
                    break
                case 1:
                    setData(c => ({...c, brands: selectedData}))
                    break
                case 2:
                    setData(c => ({...c, patterns: selectedData}))
                    break
            }
        }
    }, [selectedData])
    const _renderItem = ({item: {value, src}}: {item: ItemType}) => {
        const i = selectedData.indexOf(value)
        const onPress = () => {
            if (i !== -1) {
                selectedData.splice(i, 1)
            } else {
                selectedData.push(value)
            }
            setSelectedData([...selectedData])
        }
        return (
            <BorderlessButton {...{onPress}}>
                <Box borderRadius={'xl'} width={SIZE_ITEM} height={SIZE_ITEM} borderColor={'buttonGrayBg'}
                             style={[{
                                 backgroundColor: !src ? value : 'transparent',
                                 borderWidth: !src ? 0 : 3
                             }]}>
                    {src &&
                        <Box alignItems={'center'} justifyContent={'center'} flex={1}>
                            <Image resizeMode={'contain'} source={src} style={{width: SIZE_ITEM - 50, height: SIZE_ITEM - 50}}/>
                        </Box>
                    }
                    {selectedData.includes(value) &&
                        <Box position={'absolute'} right={0} width={45} height={45} borderRadius={'m'}
                             backgroundColor={'mainBg'} justifyContent={'center'} alignItems={'center'}>
                            <Box backgroundColor={'primary'} width={40} height={40} borderRadius={'m'} alignItems={'center'}
                                 justifyContent={'center'}>
                                <Icon name={'check'} size={20} color={'#fff'}/>
                            </Box>
                        </Box>
                    }
                </Box>
            </BorderlessButton>
        );
    }
    return (
        <Box width={width} overflow={'hidden'}>
            <Box paddingHorizontal={'l'} alignItems={'center'} style={{marginBottom: 88}}>
                <Text mb={'m'} variant={'title'} fontSize={28} color={'text'}>{title}</Text>
                <Text textAlign={'center'} variant={'text'} mb={'m'} fontSize={14}
                      color={'registrationText'}>{desc}</Text>
            </Box>
            <Carousel
                removeClippedSubviews={false}
                loop={true}
                data={data}
                renderItem={_renderItem}
                inactiveSlideScale={.75}
                sliderWidth={data.length * (SIZE_ITEM - 94)}
                itemWidth={SIZE_ITEM + 46}
            />
        </Box>
    );
};

type ItemType = {value: string, src?: ImageRequireSource}
type ConfigItemType = {
    title: string
    desc: string
}
