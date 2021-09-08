import React from 'react';
import {Box, Theme, Text} from "../../utils/theme";
import {Icons} from "../../constants";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Feather as Icon} from "@expo/vector-icons";
import {useTheme} from "@shopify/restyle";
import {BorderlessButton} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";

type Props = {
    label?: string
    left: {
        icon: Icons
        onPress: () => void
    }
    right?: {
        icon: Icons
        onPress: () => void
        count?: number
    }
    darkMode?: boolean
    rounded?: boolean
    roundedInvert?: boolean
    color?: string
};
export const Header = ({
                           label,
                           left,
                           right,
                           darkMode = false,
                           rounded = false,
                           roundedInvert = false,
                           color: colorRounded
                       }: Props) => {
    const insets = useSafeAreaInsets()
    const theme = useTheme<Theme>()
    const color = darkMode ? theme.colors.text : theme.colors.mainBg
    const colorText = darkMode ? 'text' : 'mainBg'
    return (
        <Box paddingHorizontal={'l'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}
             style={{paddingTop: insets.top}}>
            <BorderlessButton onPress={left.onPress}>
                <Box
                    style={[styles.rounded, {backgroundColor: rounded && colorRounded ? colorRounded : rounded ? '#fafafa' : roundedInvert ? 'rgba(255, 255, 255, .1)' : 'transparent'}]}>
                    <Icon name={left.icon} size={20} {...{color}}/>
                </Box>
            </BorderlessButton>
            {label && <Text variant={'title'} fontSize={12} color={colorText}>{label.toUpperCase()}</Text>}
            {right ? <BorderlessButton onPress={right.onPress}>
                <Box
                    style={[styles.rounded, {backgroundColor: rounded && colorRounded ? colorRounded : rounded ? '#fafafa' : roundedInvert ? 'rgba(255, 255, 255, .1)' : 'transparent'}]}>
                    {right.count || right.count === 0 ?
                        <Box justifyContent={'center'} right={0} top={0} alignItems={'center'} borderRadius={'xl'}
                             position={'absolute'} width={15} height={15}
                             backgroundColor={!roundedInvert ? 'primary' : 'mainBg'}>
                            <Text variant={'onBoardingTitle'} fontSize={8}
                                  color={roundedInvert ? 'primary' : 'mainBg'}>{right.count}</Text>
                        </Box> : undefined
                    }
                    <Icon name={right.icon} size={20} {...{color}}/>
                </Box>
            </BorderlessButton> : <Box width={45}/>
            }
        </Box>
    );
};

const styles = StyleSheet.create({
    rounded: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    }
})
