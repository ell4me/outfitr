import React from 'react';
import {Box} from "../../../utils/theme";

type Props = {
    top?: boolean
}

export const SwipeBar = ({top = false}: Props) => {
    return (
        <Box position={'absolute'} bottom={!top ? 0 : undefined} top={top ? 0 : undefined} left={0} right={0} height={30} alignItems={'center'} justifyContent={'center'}>
            <Box style={{backgroundColor: 'rgba(21, 22, 36, .1)', borderRadius: 2.5}} width={60}
                 height={5}/>
        </Box>
    );
};
