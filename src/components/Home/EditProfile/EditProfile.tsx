import React, {useEffect, useState} from 'react';
import {Box, Text} from '../../../utils/theme'
import {Header} from "../Header";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";
import {StatusBar} from "expo-status-bar";
import {Dimensions} from "react-native";
import {Tabs} from "./Tabs";
import {Info} from "./Info";
import {Config} from "./Config";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useIsFocused} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {getInfoUser} from "../../../redux/selectors/config-selector";
import {setInitialConfigInfo} from "../../../redux/reducers/config-reducer";

const {width} = Dimensions.get('window')
export const EditProfile = ({navigation}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'EditProfile'>) => {
    const isFocused = useIsFocused()
    const {name, mail, id} = useSelector(getInfoUser)
    const dispatch = useDispatch()
    const [hideSwipe, setHideSwipe] = useState(false) // android bug for swipe button(jump over keyboard)
    useEffect(() => {
        if(isFocused && id) {
            dispatch(setInitialConfigInfo(id))
        }
    }, [isFocused, id]);
    return (
        <KeyboardAwareScrollView enableOnAndroid={true} scrollEnabled={false}
                                 contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}
                                 onKeyboardDidHide={() => setHideSwipe(false)}
                                 onKeyboardDidShow={() => setHideSwipe(true)}>
            <Box flex={1} backgroundColor={'mainBg'}>
                {isFocused && <StatusBar style={'light'}/>}
                <Box flex={0.22} backgroundColor={'mainBg'}>
                    <Box position={"absolute"} top={0} left={0} right={0} bottom={0} backgroundColor={'text'}
                         borderBottomRightRadius={'xl'}/>
                    <Header label={'edit profile'}
                            left={{icon: 'arrow-left', onPress: () => navigation.navigate('OutfitIdeas')}}/>
                </Box>
                <Box flex={0.77}>
                    <Box position={'absolute'} style={{width}} height={100} top={0} backgroundColor={'text'}/>
                    <Box position={"absolute"} top={0} left={0} right={0} bottom={0} backgroundColor={'mainBg'}
                         borderBottomRightRadius={'xl'} borderTopLeftRadius={'xl'}/>
                    <Box position={"absolute"} top={-50} left={width / 2 - 50} width={100} height={100}
                         backgroundColor={'avatarBg'} borderRadius={'xl'}/>
                    <Box style={{zIndex: 1}}>
                        <Box alignItems={'center'} style={{marginTop: 70, marginBottom: 32}}>
                            <Text variant={'title'} fontSize={28} mb={'xs'}>{name}</Text>
                            <Text variant={'text'} color={'registrationText'}>{mail}</Text>
                        </Box>
                    </Box>
                    <Tabs>
                        <Info hideSwipe={hideSwipe}/>
                        <Config/>
                    </Tabs>
                </Box>
            </Box>
        </KeyboardAwareScrollView>
    );
};
