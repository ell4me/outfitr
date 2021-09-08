import React, {FC} from 'react';
import {RectButton, RectButtonProps} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import {Text, Theme} from '../../utils/theme'
import {useTheme} from "@shopify/restyle";

interface Props extends RectButtonProps{
    variant: 'default' | 'primary' | 'transparent',
    label: string
}
export const Button: FC<Props> = ({variant, label, style, ...restProps}) => {
    const theme = useTheme<Theme>()
    const color: keyof typeof theme.colors = variant === 'primary' ? 'mainBg' : 'text'
    const bgColor = variant === 'primary' ? theme.colors.primary
        : variant === 'default' ? theme.colors.buttonGrayBg : theme.colors.buttonTransparentBg
    return (
        <RectButton {...restProps} style={[styles.container, {backgroundColor: bgColor}, style]}>
            <Text color={color} variant={"textBtn"}>{label}</Text>
        </RectButton>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 245,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 25
    }
})

Button.defaultProps = {variant: 'default'}
