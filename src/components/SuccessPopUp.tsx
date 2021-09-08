import * as React from 'react';
import {CloseButton} from "./footers/CloseButton";
import {Box, Text, Theme} from "../utils/theme";
import {Feather as Icon} from "@expo/vector-icons";
import {Button} from "./FormElements/Button";
import {Container} from "./Container";
import {useTheme} from "@shopify/restyle";
import {Icons} from "../constants";
import {Dimensions} from "react-native";

type Props = {
    icon: Icons
    title: string
    subTitle: string
    buttonText: string
    onPressClose: () => void
    onPress: () => void
};

const {width} = Dimensions.get('window')
export const SuccessPopUp = ({icon, title, subTitle, buttonText, onPressClose, onPress}: Props) => {
    const theme = useTheme<Theme>()
    return (
        <Container pattern={3} footer={<CloseButton onPress={onPressClose}/>}>
            <Box justifyContent={'center'} flex={1}>
                <Box alignItems={"center"}>
                    <Box justifyContent={'center'} mb={'l'} borderRadius={'xl'} alignItems={'center'} width={80} height={80} backgroundColor={'primaryOpacity'}>
                        <Icon name={icon} size={35} color={theme.colors.primary}/>
                    </Box>
                </Box>
                <Box paddingHorizontal={'xxl'}>
                    <Text variant={'title'} fontSize={28} color={'text'} marginBottom={'m'} textAlign={'center'}>
                        {title}
                    </Text>
                    <Text variant={'text'} color={'registrationText'} textAlign={'center'}>
                        {subTitle}
                    </Text>
                </Box>
                <Box pt={'xl'} width={width} paddingHorizontal={'l'} paddingBottom={'xl'}>
                    <Box alignItems={'center'}>
                        <Button {...{onPress}} label={buttonText}
                                variant={'primary'}/>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
