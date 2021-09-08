import React, {useState} from 'react';
import {Box, Text} from '../../../utils/theme'
import {Switch as SwitchRN} from 'react-native'


type Props = {
    title: string
    subTitle: string
};
export const Switch = ({title, subTitle}: Props) => {
    const [active, setActive] = useState(false)
    const toggleSwitch = () => setActive(previousState => !previousState);
    return (
        <Box mb={'l'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <Text variant={'title'}  color={'text'} fontSize={16} lineHeight={24}>{title}</Text>
                <Text variant={'text'} fontSize={13} color={'registrationText'}>{subTitle}</Text>
            </Box>
            <SwitchRN  trackColor={{ false: "#E6E6E6", true: "#2CB9B0" }}
                       ios_backgroundColor="#E6E6E6"
                       onValueChange={toggleSwitch}
                       value={active}
            />
        </Box>
    );
};
