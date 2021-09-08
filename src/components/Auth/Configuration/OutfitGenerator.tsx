import React, {useState} from 'react';
import {Box, Text} from "../../../utils/theme";
import {AnimatedBox} from "../../../constants";
import {StatusBar} from "expo-status-bar";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BorderlessButton} from "react-native-gesture-handler";
import {Button} from "../../FormElements/Button";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import {AppRoutes} from "../../../../App";
import {Dimensions} from "react-native";
import {interpolate, useAnimatedStyle} from "react-native-reanimated";
import {GeneratorItem} from "./GeneratorItem";
import {useSpring} from "react-native-redash";
import {CommonActions, useIsFocused} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {DataOutfitGenerator, setAllUserInfo} from "../../../redux/reducers/config-reducer";
import {getConfigInfo, getContentOutfitGenerator} from "../../../redux/selectors/config-selector";


const {width} = Dimensions.get('window')
export const OutfitGenerator = ({navigation}: ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'OutfitGenerator'>) => {
    const dispatch = useDispatch()
    const configData = useSelector(getContentOutfitGenerator)
    const {brands, colors} = useSelector(getConfigInfo)
    const insets = useSafeAreaInsets()
    const [step, setStep] = useState(1)
    const [data, setData] = useState<DataOutfitGenerator>({colors: [], brands: [], patterns: []})
    const anim = useSpring(step, {damping: 15})
    const isFocused = useIsFocused()
    const redirect = () => {
        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [
                {name: 'Home'}
            ]
        }))
    }
    const backHandler = () => {
        if (step === 1) {
            navigation.goBack()
        } else {
            setStep(c => c - 1)
        }
    }
    const nextHandler = () => {
        if (step === 3) {
            dispatch(setAllUserInfo(data))
            redirect()
        } else {
            setStep(c => c + 1)
        }
    }
    const skipHandler = () => {
        switch (step) {
            case 1:
                setData(c => ({...c, colors: []}))
                setStep(c => c + 1)
                break
            case 2:
                setData(c => ({...c, brands: []}))
                setStep(c => c + 1)
                break
            case 3:
                dispatch(setAllUserInfo({...data, patterns: []}))
                redirect()
                break
        }
    }
    const translateX = useAnimatedStyle(() => ({
        transform: [{translateX: interpolate(anim.value, [1, 3], [width, -width])}]
    }))
    const widthProgress = useAnimatedStyle(() => ({
        width: interpolate(anim.value, [1, 3], [(width - 72) / 3, (width - 72)])
    }))
    return (
        <Box flex={1}>
            {isFocused && <StatusBar style={'light'}/>}
            <Box flex={0.2} backgroundColor={'text'} paddingHorizontal={'l'} justifyContent={'center'}>
                <Box alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>
                    <Text variant={'textBtn'} fontSize={18} color={'mainBg'}>Step {step}/3</Text>
                    <BorderlessButton onPress={skipHandler}>
                        <Text variant={'textBtn'} fontSize={14} color={'mainBg'}>Skip</Text>
                    </BorderlessButton>
                </Box>
                <Box width={width - 72} height={3} backgroundColor={'whiteOpacity'}
                     style={{borderRadius: 5, marginTop: 25}}>
                    <AnimatedBox position={'absolute'} top={0} left={0} bottom={0} backgroundColor={'primary'}
                                 style={[{borderRadius: 5}, widthProgress]}/>
                </Box>
            </Box>
            <Box flex={0.8} backgroundColor={'text'}>
                <Box position={'absolute'} top={0} left={0} right={0} bottom={0} backgroundColor={'mainBg'}
                     borderTopLeftRadius={'xl'} borderTopRightRadius={'xl'} pt={'xxl'} alignItems={'center'}>
                    <Text variant={'title'} letterSpacing={1.5} mb={'s'} fontSize={12}
                          color={'registrationText'}>OUTFIT GENERATOR</Text>
                    <AnimatedBox flexDirection={'row'} style={translateX} width={width * 3}>
                        {configData.map((item, index) => {
                            let data;
                            if(index === 1) {
                                data = brands
                            } else data = colors
                            return <GeneratorItem data={data} index={index} setData={setData} key={index} item={item}/>
                        })}
                    </AnimatedBox>
                    <Box height={130 + insets.bottom} alignItems={'center'} style={{paddingBottom: insets.bottom}}
                         position={'absolute'} bottom={0} left={0} right={0}>
                        <Box flexDirection={'row'}>
                            <Text variant={'title'} color={'text'} fontSize={14} lineHeight={20}>Swipe
                                left-right </Text>
                            <Text variant={'text'} color={'text'} fontSize={14} lineHeight={20}>to see more</Text>
                        </Box>
                        <Box pt={'xl'} flexDirection={'row'}>
                            <Button onPress={backHandler} label={'Back'} variant={'default'}
                                    style={{width: 136, marginRight: 13}}/>
                            <Button onPress={nextHandler} label={step === 3 ? 'Save' : 'Next'} variant={'primary'}
                                    style={{width: 136}}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
