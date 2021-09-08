import React, {forwardRef} from 'react';
import {Box, Theme} from '../../utils/theme';
import {StyleSheet, TextInput as Input, TextInputProps} from 'react-native'
import {useTheme} from '@shopify/restyle';
import {Feather as Icon} from '@expo/vector-icons';
import {Icons} from "../../constants";

interface Props extends TextInputProps {
    icon: Icons
    touched?: boolean
    error?: string
}

export const TextInput = forwardRef<Input, Props>(({icon,touched, error, style, ...restProps}, ref) => {
    const theme = useTheme<Theme>()
    const borderColor = touched && error ? 'danger' : touched && !error ? 'primary' : 'borderDefault'
    const color = touched && error ? theme.colors.danger : touched && !error ? theme.colors.primary : theme.colors.borderDefault
    return (
        <Box style={[{borderRadius: theme.borderRadii.s / 5}, style, styles.container]}
             {...{borderColor}} paddingHorizontal={'m'}>
            <Box flexDirection={'row'} alignItems={'center'}>
                <Icon name={icon} {...{color}} size={20}/>
                <Input selectionColor={theme.colors.primary} style={[{color: theme.colors.textInput}, styles.input]} underlineColorAndroid={'transparent'}
                       placeholderTextColor={theme.colors.textPlaceholder} {...restProps} ref={ref}/>
                {touched &&
                    <Box width={20} height={20} borderRadius={'xl'} backgroundColor={error ? 'danger' : 'primary'} justifyContent={'center'}
                         alignItems={'center'}>
                        <Icon style={{paddingLeft: 1, paddingTop: 1}} name={error ? 'x' : 'check'} color={theme.colors.mainBg} size={10}/>
                    </Box>
                }
            </Box>
        </Box>
    );
})

const styles = StyleSheet.create({
    container: {
        borderWidth: StyleSheet.hairlineWidth,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        fontFamily: "SFProText-Medium",
        fontSize: 14,
        flex: 1,
        marginHorizontal: 12
    }
})
