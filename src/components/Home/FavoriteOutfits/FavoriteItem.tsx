import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, Theme} from "../../../utils/theme";
import {Feather as Icon} from "@expo/vector-icons";
import {TapButton} from "../../TapButton";
import {useTheme} from "@shopify/restyle";
import {Dimensions} from "react-native";
import {ItemFavouriteType} from "../../../redux/reducers/outfits-reducer";

type Props = {
    editMode: boolean
    selectedIds: number[]
    setSelectedIds: Dispatch<SetStateAction<number[]>>
} & ItemFavouriteType;
const {width} = Dimensions.get('window')
export const FavoriteItem = ({id,color,ratio, editMode, selectedIds, setSelectedIds}: Props) => {
    const theme = useTheme<Theme>()
    const itemWidth = (width - theme.spacing.l * 2 - theme.spacing.xs * 2) / 2
    const [state, setState] = useState<undefined | boolean>(undefined);
    useEffect(() => {
        if(state != undefined) {
            if(!selectedIds.includes(id)) {
                setSelectedIds(c => [...c, id])
            } else {
                setSelectedIds(c => c.filter(c => c != id))
            }
        }
    }, [state])
    return (
        <TapButton onPress={() => setState(c => !c)}>
            <Box style={{marginRight: 16, marginBottom: 16}} backgroundColor={color}
                 width={itemWidth} height={itemWidth * ratio}>
                {editMode &&
                <Box width={20} height={20} position={'absolute'} right={10} top={10} borderRadius={'xl'}
                     backgroundColor={selectedIds.includes(id) ? 'primary' : 'whiteOpacity'} justifyContent={'center'}
                     alignItems={'center'} borderWidth={1} borderColor={selectedIds.includes(id) ? 'buttonTransparentBg' : 'mainBg'}>
                    {selectedIds.includes(id) && <Icon style={{paddingLeft: 1, paddingTop: 1}} name={'check'} color={theme.colors.mainBg} size={10}/>}
                </Box>
                }
            </Box>
        </TapButton>
    );
};
