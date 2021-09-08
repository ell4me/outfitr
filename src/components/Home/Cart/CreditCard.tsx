import React from 'react';
import {Box, Text, Theme} from '../../../utils/theme'
import {BorderlessButton} from "react-native-gesture-handler";
import {MastercardLogo} from "../../../constants/MastercardLogo";
import {VisaLogo} from "../../../constants/VisaLogo";
import {Image, Platform} from 'react-native'
import {useTheme} from "@shopify/restyle";
import {CreditCardType} from "../../../redux/reducers/products-reducer";

type Props = {
    data: CreditCardType
    active: string
    setActive: () => void
};
export const CreditCard = ({data: {type, number, expiration, pattern}, active, setActive}: Props) => {
    const theme = useTheme<Theme>()
    const src = [0, require(`./assets/1.png`), require(`./assets/2.png`), require(`./assets/3.png`)]
    return (
        <BorderlessButton onPress={() => setActive()}>
            <Box style={{
                backgroundColor: active === number ? '#2CB9B0' : '#fff',
                opacity: active === number ? 1 : .3,
                borderRadius: 12,
                height: 160,
                width: 120,
                marginRight: 20,
            }}>
                <Box padding={'m'} pb={'xs'}>
                    <Box mb={Platform.OS === 'android' ? undefined : 'm'} height={20} justifyContent={'center'}>
                        {!type ? <VisaLogo active={active === number}/> : <MastercardLogo/>}
                    </Box>
                    <Text variant={'onBoardingTitle'} mb={Platform.OS === 'android' ? undefined : 'xs'} fontSize={16}
                          color={active === number ? 'mainBg' : 'text'}>**** {number}</Text>
                    <Box>
                        <Text variant={'text'} fontSize={10} lineHeight={16}
                              style={{color: active === number ? 'rgba(255,255,255,.5)' : theme.colors.registrationText}}>Expiration</Text>
                        <Text variant={'title'} fontSize={12} lineHeight={14}
                              color={active === number ? 'mainBg' : 'text'}>{expiration}</Text>
                    </Box>
                </Box>
                <Box alignItems={'center'}>
                    <Image source={src[pattern]}/>
                </Box>
            </Box>
        </BorderlessButton>
    );
};
