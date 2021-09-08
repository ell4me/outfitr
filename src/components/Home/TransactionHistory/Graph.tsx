import React, {useMemo} from 'react';
import {Box, Theme} from "../../../utils/theme";
import {Dimensions} from "react-native";
import {useTheme} from "@shopify/restyle";
import Animated, {interpolate} from "react-native-reanimated";
import moment from "moment";
import {Underlay} from "./Underlay";
import {roundHundreds} from "../../../utils/roundHundreds";
import {useTransition} from 'react-native-redash/lib/module/v1';
import {useIsFocused} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {getTransactionsData} from "../../../redux/reducers/transactions-reducer";

type Props = {
    minX: string
    maxX: string
}

const {width} = Dimensions.get('window')
export const Graph = ({minX, maxX}: Props) => {
    const transactionData = useSelector(getTransactionsData)
    const isFocused = useIsFocused()
    const focus = useTransition(isFocused, {duration: 400})
    const theme = useTheme<Theme>()
    const maxY = Math.max(...transactionData.map(({value}) => value))
    const {maxYRound} = useMemo(() => roundHundreds(maxY), [maxY]);
    const numberOfMonths = Math.ceil(moment(new Date (maxX)).diff(new Date (minX), 'months', true))
    const WIDTH_GRAPH = width - theme.spacing.l * 2
    const HEIGHT_GRAPH = 195 / 305 * WIDTH_GRAPH
    const WIDTH_ITEM = ((WIDTH_GRAPH - 30) / numberOfMonths) - 24

    return (
        <Box alignItems={'flex-end'} width={WIDTH_GRAPH} height={HEIGHT_GRAPH}>
            <Underlay {...{width: WIDTH_ITEM, numberOfMonths, minX, maxY, widthGraph: WIDTH_GRAPH, heightGraph: HEIGHT_GRAPH}}/>
            <Box flexDirection={'row'} alignItems={'flex-end'} width={WIDTH_GRAPH - 30}
                 height={HEIGHT_GRAPH - 30}>
                {transactionData.map(({date, value, color}) => {
                    const index = Math.round(moment(new Date(date)).diff(new Date (minX), "month", true))
                    const step = index * (WIDTH_ITEM + 28)
                    const HEIGHT_ITEM = interpolate(value, [0, maxYRound], [0, HEIGHT_GRAPH - 30])
                    const currentHeight = Animated.multiply(focus, HEIGHT_ITEM)
                    const translateY = Animated.sub(HEIGHT_ITEM, currentHeight)
                    return index >= 0 ? (
                        <Box position={'absolute'} left={step} key={date} overflow={'hidden'}>
                            <Animated.View style={{transform: [{translateY: translateY}], width: WIDTH_ITEM, height: HEIGHT_ITEM}}>
                                <Box height={28} backgroundColor={color} borderRadius={'xl'}/>
                                <Box borderTopLeftRadius={'xl'}  borderTopRightRadius={"xl"} backgroundColor={color}
                                     opacity={.1} position={'absolute'} top={0} right={0}
                                     bottom={0} left={0}/>
                            </Animated.View>
                        </Box>
                    ) : undefined
                })}
            </Box>
        </Box>
    );
};
