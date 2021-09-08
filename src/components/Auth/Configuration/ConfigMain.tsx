import React, {useState} from 'react';
import {Box, Text} from "../../../utils/theme";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import {AppRoutes} from "../../../../App";
import {Container} from "../../Container";
import {SwipeButton} from "../../SwipeButton";
import {RadioGroup} from "../../RadioGroup";
import {RadioRoundedGroup} from "../../RadioRoundedGroup";
import {useDispatch, useSelector} from "react-redux";
import {getConfigInfo} from "../../../redux/selectors/config-selector";
import {DataConfigType, saveConfigInfo} from "../../../redux/reducers/config-reducer";


export const ConfigMain = ({navigation}: ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'Config'>) => {
    const [allInfo, setAllInfo] = useState<DataConfigType>({} as DataConfigType)
    const {gender, sizes, outfitType} = useSelector(getConfigInfo)
    const dispatch = useDispatch()
    const onEndedActionCallback = () => {
        dispatch(saveConfigInfo(allInfo))
        navigation.navigate('OutfitGenerator')
    }
    const setConfigInfo = (type: string) => (data: string[]) => setAllInfo(c => ({...c, [type]: [...data]}))
    return (
        <Container customFooterHeight={130} pattern={2}
                   footer={<SwipeButton onEndedActionCallback={onEndedActionCallback} bg={'text'}
                                        label={'Swipe to continue'} success={"Let's go!"}/>}>
            <Box alignItems={'center'} paddingHorizontal={'l'} flex={1} mt={'xxl'}>
                <Text variant={'title'} letterSpacing={1.5} mb={'s'} fontSize={12} color={'registrationText'}>OUTFIT
                    GENERATOR</Text>
                <Text mb={'xl'} variant={'title'} fontSize={28} color={'text'}>Configure account</Text>
                <Box alignItems={'center'} mb={'xl'}>
                    <Text variant={'text'} mb={'m'} fontSize={14} color={'registrationText'}>What outfits do you want to
                        see?</Text>
                    <RadioGroup data={gender} checkbox={true}
                                setConfigInfo={setConfigInfo('gender')}/>
                </Box>
                <Box alignItems={'center'} mb={'xl'}>
                    <Text variant={'text'} mb={'m'} fontSize={14} color={'registrationText'}>What type of outfit you
                        usually wear?</Text>
                    <RadioGroup data={outfitType} setConfigInfo={setConfigInfo('outfitType')}/>
                </Box>
                <Box alignItems={'center'}>
                    <Text mb={'s'} variant={'text'} fontSize={14} color={'registrationText'}>What is your size?</Text>
                    <RadioRoundedGroup data={sizes} setConfigInfo={setConfigInfo('sizes')}/>
                </Box>
            </Box>
        </Container>
    );
};
