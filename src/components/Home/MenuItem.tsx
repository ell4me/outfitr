import React from 'react';
import {Box, Theme, Text} from "../../utils/theme";
import {BorderlessButton} from "react-native-gesture-handler";
import {Feather as Icon} from "@expo/vector-icons";
import {useTheme} from "@shopify/restyle";
import {Icons} from "../../constants";

type MenuItemProps = {
    color: string,
    icon: Icons
    label: string,
    onPress?: () => void,
    count?: number
};
export const MenuItem = ({color,icon,label, onPress, count}: MenuItemProps) => {
    const theme = useTheme<Theme>()
    return (
        <BorderlessButton {...{onPress}}>
            <Box alignItems={'center'} justifyContent={'center'} flexDirection={'row'} style={{marginBottom: 24}}>
                <Box borderRadius={'xl'} justifyContent={'center'} alignItems={'center'} style={{marginRight: 16, width: 36, height: 36, backgroundColor: color}}>
                    <Box><Icon name={icon} size={18} color={theme.colors.mainBg}/></Box>
                </Box>
                <Text variant={'textBtn'} color={'text'} fontSize={16}>{label}</Text>
                {count && <Text style={{marginLeft: 2}} variant={'textBtn'} color={'registrationText'} opacity={.8} fontSize={16}>({count})</Text>}
            </Box>
        </BorderlessButton>
    );
};
