import React, {useMemo} from 'react';
import {Box, Text} from "../../../utils/theme";
import moment from "moment";
import {interpolate} from "react-native-reanimated";
import {roundHundreds} from "../../../utils/roundHundreds";


type Props = {
    width: number
    numberOfMonths: number
    minX: string
    maxY: number
    widthGraph: number
    heightGraph: number
};
export const Underlay = ({minX,maxY,numberOfMonths,width,widthGraph, heightGraph}: Props) => {
    const {maxYRound, hundredths} = useMemo(() => roundHundreds(maxY), [maxY]);
    return (
        <Box  position={'absolute'} left={0} right={0} top={0} bottom={0}>
            <Box position={'absolute'} top={-11} height={heightGraph - 7} justifyContent={'space-between'}>
                {[1,0.66,0.33,0].map((item,i) => {
                    const val = Math.round(interpolate(item, [0,1], [0, maxYRound]) / hundredths) * hundredths
                    return (
                        <Box key={i} width={widthGraph} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text variant={'text'} fontSize={10} color={'total'}>{val}</Text>
                            <Box width={widthGraph - 30} style={{backgroundColor: 'rgba(233,235,241,.5)'}} height={1}/>
                        </Box>
                    )
                })}
            </Box>
            <Box flexDirection={'row'} alignItems={'center'} position={'absolute'} left={32} bottom={0}>
                {new Array(numberOfMonths).fill(0).map((_, i) => {
                    const month = moment(new Date(minX)).add(i, 'month').format('MMM')
                    return (
                        <Box key={i} width={width} style={{marginRight: 28}}>
                            <Text variant={'text'} fontSize={9} color={'total'}>{month}</Text>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    );
};
