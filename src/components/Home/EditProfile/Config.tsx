import React, {useState} from 'react';
import {Box, Text} from '../../../utils/theme'
import {RadioGroup} from "../../RadioGroup";
import {ScrollView, Image} from "react-native";
import {RadioRoundedGroup} from "../../RadioRoundedGroup";
import {SwipeButton} from "../../SwipeButton";
import {useDispatch, useSelector} from "react-redux";
import {getConfigInfo, getIsLoading, getSavedConfigInfo} from "../../../redux/selectors/config-selector";
import {updateUserConfigInfo} from "../../../redux/reducers/config-reducer";

type keys = 'gender' | 'sizes' | 'colors' | 'brands'
export type DataConfigChange = {
    [key in keys]: string[];
};
export const Config = () => {
    const dispatch = useDispatch()
    const [allInfo, setAllInfo] = useState<DataConfigChange>({} as DataConfigChange)
    const [height, setHeight] = useState(0)
    const {colors, gender, sizes, brands} = useSelector(getConfigInfo)
    const initialConfigInfo = useSelector(getSavedConfigInfo)
    const isLoading = useSelector(getIsLoading)
    const setConfigInfo = (type: keys) => (data: string[]) => setAllInfo(c => ({...c, [type]: [...data]}))
    const onEndedActionCallback = () => dispatch(updateUserConfigInfo(allInfo))
    return (
        <Box flex={1}>
            {!isLoading ?
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Box flex={1} style={{paddingBottom: height}}>
                            <Box pb={'m'}>
                                <Text mb={'s'} variant={'text'} fontSize={14} color={'registrationText'}>What type of
                                    outfit you
                                    usually wear?</Text>
                                <RadioGroup data={gender} checkbox={true} initialData={initialConfigInfo.gender}
                                            setConfigInfo={setConfigInfo('gender')}/>
                            </Box>
                            <Box pb={'m'}>
                                <Text mb={'s'} variant={'text'} fontSize={14} color={'registrationText'}>What is your
                                    clothing
                                    size?</Text>
                                <RadioRoundedGroup data={sizes} setConfigInfo={setConfigInfo('sizes')}
                                                   initialData={initialConfigInfo.sizes}/>
                            </Box>
                            <Box pb={'m'}>
                                <Text mb={'s'} variant={'text'} fontSize={14} color={'registrationText'}>My preferred
                                    clothing
                                    colors</Text>
                                <RadioRoundedGroup data={colors} color setConfigInfo={setConfigInfo('colors')}
                                                   initialData={initialConfigInfo.colors}/>
                            </Box>
                            <Box>
                                <Text mb={'s'} variant={'text'} fontSize={14} color={'registrationText'}>My preferred
                                    brands</Text>
                                <RadioGroup data={brands} setConfigInfo={setConfigInfo('brands')}
                                            initialData={initialConfigInfo.brands}/>
                            </Box>
                        </Box>
                    </ScrollView>
                    <SwipeButton label={'Swipe to save changes'} setHeight={setHeight}
                                 onEndedActionCallback={onEndedActionCallback}/>
                </> : <Box  justifyContent={'center'} alignItems={'center'} style={{marginRight: 72}}>
                        <Image style={{width: 150, height: 150}} source={require('../../../../assets/preloader.gif')}/>
                      </Box>
            }
        </Box>
    );
};
