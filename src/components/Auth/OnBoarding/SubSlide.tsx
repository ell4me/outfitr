import * as React from 'react';
import {StyleSheet, Dimensions} from "react-native";
import {FC} from "react";
import {Button} from "../../FormElements/Button";
import { Box, Text } from '../../../utils/theme';

type Props = {
    desc: string
    subtitle: string
    last: boolean
    onPress?: (...args: any[]) => void
};
const {width} = Dimensions.get('window')
export const SubSlide: FC<Props> = (props) => {
    return (
        <Box style={styles.container}>
            <Text variant={'title'} mb={'m'} style={styles.center}>{props.subtitle}</Text>
            <Text variant={'text'} mb={'xl'} style={styles.center}>{props.desc}</Text>
            <Button onPress={props.onPress} variant={props.last ? 'primary' : 'default'} label={props.last ? 'Let’s get started' : 'Next'}/>
        </Box>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 44,
        paddingLeft: 44,
        width
    },
    center: {
        textAlign: 'center'
    }
})

