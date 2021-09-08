import React, {useEffect, useState} from 'react';
import {Box} from '../utils/theme'
import {Button} from './FormElements/Button'

type Props = {
    data: { name: string, value: string }[]
    checkbox?: boolean,
    onChangeForm?: (val: string) => void,
    flex?: number
    setConfigInfo?: (data: string[]) => void
    initialData?: string[]
};
export const RadioGroup = ({data, checkbox, onChangeForm, flex, setConfigInfo, initialData = []}: Props) => {
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
        <Box flexDirection={'row'} flexWrap={'wrap'}>
            {data.map(({name, value}, i) => {
                const onPress = () => {
                    if (checkbox) {
                        setSelectedData([value])
                        if(onChangeForm) {
                            onChangeForm(value)
                        }
                    } else {
                        if (selectedData.includes(value)) {
                            setSelectedData(c => c.filter(item => item !== value))
                        } else {
                            setSelectedData(c => [...c, value])
                        }
                    }
                }
                return (
                    <Box flex={flex} key={value} style={{marginRight: i + 1 !== data.length ? 10 : 0, marginBottom: 10}}>
                        <Button {...{onPress}} style={{
                            width: 'auto',
                            height: 'auto',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20
                        }} label={name} variant={selectedData.includes(value) ? 'primary' : 'default'}/>
                    </Box>
                )
            })}
        </Box>
    );
};
