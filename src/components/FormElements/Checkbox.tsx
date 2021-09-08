import React, {useState} from 'react';
import { Box, Text} from '../../utils/theme';
import {Feather as Icon} from "@expo/vector-icons";
import {BorderlessButton} from "react-native-gesture-handler";

type Props = {
    label: string,
    value: boolean,
    onChange: () => void
};
export const Checkbox = ({label, value, onChange}: Props) => {
    const [checked, setChecked] = useState(value)
    const backgroundColor = checked ? 'primary' : 'mainBg'
    return (
        <BorderlessButton onPress={() => {
            setChecked(c => !c)
            onChange()
        }}>
            <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                <Box {...{backgroundColor}} borderColor={'primary'} borderWidth={1} width={20} height={20} justifyContent={'center'} alignItems={'center'} borderRadius={'checkbox'}>
                    <Icon name={'check'} size={12} color={'#fff'}/>
                </Box>
                <Text variant={'text'} fontSize={15} marginLeft={'s'}>{label}</Text>
            </Box>
        </BorderlessButton>
    );
};
