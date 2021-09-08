import React, {useEffect, useState} from 'react';
import {Box, Text, Theme} from '../utils/theme'
import {Feather as Icon} from "@expo/vector-icons";
import {useTheme} from "@shopify/restyle";
import {BorderlessButton} from "react-native-gesture-handler";
import {ScrollView} from "react-native";

type Props = {
    data: { value: string }[]
    color?: boolean
    padding?: boolean
    initialData?: string[]
    checkbox?: boolean,
    setConfigInfo?: (data: string[]) => void
};
export const RadioRoundedGroup = ({checkbox, data, color, padding = false, initialData = [], setConfigInfo}: Props) => {
    const theme = useTheme<Theme>()
    const [selectedData, setSelectedData] = useState(initialData as string[])
    useEffect(() => {
        if (setConfigInfo) {
            setConfigInfo([...selectedData])
        }
    }, [selectedData])
    useEffect(() => {
        if(initialData?.length) {
            setSelectedData(initialData)
        }
    }, [initialData]);

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Box flexDirection={'row'} flexWrap={'wrap'} paddingRight={padding ? undefined : 'xxl'}>
                {data.length && data.map(({value}) => {
                    const onPress = () => {
                        if (checkbox) {
                            setSelectedData([value])
                        } else {
                            if (selectedData.includes(value)) {
                                setSelectedData(c => c.filter(item => item !== value))
                            } else {
                                setSelectedData(c => [...c, value])
                            }
                        }
                    }
                    return (
                        <Box key={value} style={{marginRight: 18, marginBottom: 10}}>
                            <BorderlessButton {...{onPress}}>
                                <Box width={50} height={50} borderRadius={'xl'} borderColor={'roundedBorderGroup'}
                                     borderWidth={selectedData.includes(value) ? 1 : 0} justifyContent={'center'}
                                     alignItems={'center'}>
                                    <Box width={40} height={40} borderRadius={'xl'} alignItems={'center'}
                                         justifyContent={'center'}
                                         backgroundColor={selectedData.includes(value) ? 'primary' : 'checkbox'}
                                         style={color && {backgroundColor: value}}>
                                        {!color ? <Text variant={'title'} fontSize={12}
                                                        color={selectedData.includes(value) ? 'mainBg' : 'text'}>{value.toUpperCase()}</Text>
                                            : selectedData.includes(value) &&
                                            <Icon style={{paddingLeft: 1, paddingTop: 1}} name={'check'}
                                                  color={theme.colors.mainBg} size={18}/>
                                        }
                                    </Box>
                                </Box>
                            </BorderlessButton>
                        </Box>
                    )
                })}
            </Box>
        </ScrollView>
    );
};
