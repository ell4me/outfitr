import React from 'react';
import {Box, Text} from "../../../utils/theme";

type Props = {
    label: string
    cost: number
    totalItems?: number
};
export const TotalItem = ({label, cost, totalItems}: Props) => {
    return (
        <Box mb={'m'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Box flexDirection={'row'} alignItems={'center'}>
                <Text variant={'title'} fontSize={16} lineHeight={24} color={'mainBg'}>{label} </Text>
                {totalItems !== undefined && <Text variant={'title'} fontSize={16} lineHeight={24} style={{color: '#555671'}}>({totalItems})</Text>}
            </Box>
            <Text variant={'title'} fontSize={16} lineHeight={24} color={'primary'}>${cost.toFixed(2)}</Text>
        </Box>
    );
};
