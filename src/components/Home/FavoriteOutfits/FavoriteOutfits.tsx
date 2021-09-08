import React, {RefObject, useEffect, useRef, useState} from 'react';
import {Box, Theme, Text} from "../../../utils/theme";
import {Header} from "../Header";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";
import {Button} from "../../FormElements/Button";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Platform, ScrollView} from "react-native";
import {useTheme} from "@shopify/restyle";
import MasonryList from '@react-native-seoul/masonry-list'
import Svg, {Path} from "react-native-svg";
import {FavoriteItem} from "./FavoriteItem";
import {Transition, Transitioning, TransitioningView} from 'react-native-reanimated'
import {useSelector} from "react-redux";
import {getItemsFavourite} from "../../../redux/selectors/outfits-selector";

const transition = (
    <Transition.Sequence>
        <Transition.Out type="scale" />
        <Transition.Change interpolation="easeInOut" />
        <Transition.In type="fade" />
    </Transition.Sequence>
);
export const FavoriteOutfits = ({navigation}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'OutfitIdeas'>) => {
    const itemsFavourite = useSelector(getItemsFavourite)
    const insets = useSafeAreaInsets()
    const theme = useTheme<Theme>()
    const ref = useRef() as RefObject<TransitioningView>;
    const [footer, setFooter] = useState(0)
    const [dataItems, setDataItems] = useState(itemsFavourite)
    const [editMode, setEditMode] = useState(false)
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [disabled, setDisabled] = useState(false)
    const removeItemsHandler = () => {
        setDataItems(c => c.filter(({id}) => !selectedIds.includes(id)))
        ref.current?.animateNextTransition()
        setSelectedIds([])
    }
    useEffect(() => {
        if(selectedIds.length !==0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [selectedIds])
    return (
        <Box backgroundColor={'mainBg'} flex={1}>

            <Header label={editMode ? 'Select items' : 'Favorite outfits'} left={{
                icon: editMode ? 'check-square' : 'arrow-left', onPress: () => {
                    if (!editMode) {
                        navigation.goBack()
                    } else {
                        removeItemsHandler()
                        setEditMode(false)
                    }
                }
            }}
                    right={{icon: editMode ? 'x' : 'edit', onPress: () => setEditMode(c => !c)}} darkMode/>
            {dataItems.length ?

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box flexDirection={'row'} flexWrap={'wrap'}
                         backgroundColor={'mainBg'}
                         flex={1}
                         borderBottomRightRadius={'xl'} paddingLeft={'l'} paddingRight={'m'} pt={'xl'}
                         style={{paddingBottom: footer}}>
                        <Transitioning.View style={{flex: 1}} ref={ref} transition={transition}>
                        <MasonryList data={dataItems} renderItem={({item}) =>
                            <FavoriteItem key={item.id} {...item} {...{editMode, setSelectedIds, selectedIds}}/>}/>
                        </Transitioning.View>
                    </Box>
                </ScrollView>
                    : <Box flex={1} paddingHorizontal={'l'} justifyContent={'center'} alignItems={'center'}><Text variant={'title'} textAlign={'center'}>{'In "Favorite outfits" nothing at all...'}</Text></Box>
            }
            <Box style={{paddingVertical: Platform.OS === 'android' ? insets.top * 2 : insets.bottom * 2}} position={'absolute'} bottom={0} left={0} right={0}
                 onLayout={(e) => setFooter(e.nativeEvent.layout.height)}>
                <Svg style={{position: 'absolute', right: 0, top: -theme.borderRadii.xl}} viewBox={'0 0 1 1'}
                     width={theme.borderRadii.xl} height={theme.borderRadii.xl}>
                    <Path d={'M 0 1 A 0 0 0 0 0 1 0 L 1 1'} fill={'#0C0D34'}/>
                </Svg>
                <Box position={'absolute'} right={0} left={0} top={0} bottom={0} backgroundColor={'text'}
                     borderTopLeftRadius={'xl'} justifyContent={'center'} alignItems={'center'}>
                    {editMode &&
                        <Button enabled={disabled} onPress={removeItemsHandler} style={{opacity: disabled ? 1 : 0.5}} label={'Remove from favorites'} variant={'primary'}/>
                    }
                    {!editMode &&
                        <Button  label={'Add more to favorites'} variant={'primary'}/>
                    }
                </Box>
            </Box>
        </Box>
    );
};
