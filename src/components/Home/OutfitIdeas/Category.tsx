import React, {useState} from 'react';
import {Box, Text} from "../../../utils/theme";
import {TapButton} from "../../TapButton";
import {CategoryType} from "../../../redux/reducers/outfits-reducer";


export const Category = ({name, color, onPress}: CategoryType & { onPress: () => void }) => {
    const [active, setActive] = useState(false)
    return (
        <TapButton onPress={() => {
                setActive(c => !c)
                onPress()
            }
        }>
            <Box alignItems={'center'} justifyContent={'center'} style={{marginHorizontal: 7}}>
                <Box style={{marginBottom: 11, borderWidth: active ? 1 : 0}} borderColor={color}
                     justifyContent={'center'} alignItems={'center'} borderRadius={'xl'}
                     width={65} height={65} backgroundColor={'mainBg'}>
                    <Box position={'absolute'} width={60} height={60} borderRadius={'xl'} backgroundColor={color}/>
                </Box>
                <Text variant={'textBtn'} fontSize={12} color={'text'}>{name}</Text>
            </Box>
        </TapButton>
    );
};
