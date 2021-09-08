import React, {useEffect} from 'react';
import {Dimensions, Linking} from "react-native";
import {Box, Text} from '../../../utils/theme'
import {Container} from "../../Container";
import {SocialFooter} from "../../footers/SocialFooter";
import {TextInput} from "../../FormElements/TextInput";
import {Button} from '../../FormElements/Button';
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {AppRoutes} from "../../../../App";
import {AnimatedBox} from "../../../constants";
import {useAnimatedStyle} from "react-native-reanimated";
import {useDispatch, useSelector} from "react-redux";
import {getAppError} from "../../../redux/selectors/app-selector";
import {useTiming} from "react-native-redash";
import {resetPassword} from "../../../redux/reducers/app-reducer";


const {width} = Dimensions.get('window')
const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
});
export const ForgotPassword = ({navigation}: ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'ForgotPassword'>) => {
    const error = useSelector(getAppError)
    const anim = useTiming(!!error)
    const dispatch = useDispatch()
    const {handleChange, handleBlur, handleSubmit, errors, touched, values, setFieldError} = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ForgotPasswordSchema,
        onSubmit: ({email}) => {
            const redirect = () => {
                navigation.navigate('ResetPassword')
            }
            dispatch(resetPassword(email, redirect))
        },
    });
    useEffect(() => {
        if(error) {
            setFieldError('email', error)
        }
    }, [error])
    const style = useAnimatedStyle(() => ({
        opacity: anim.value
    }))
    return (
        <Container border={'none'} pattern={2} footer={<SocialFooter action={'Try another way'} label={'Don’t work? '}
                                         onPress={() => Linking.openURL('mailTo:help@fashion@gmail.com')}/>}>
            <Box justifyContent={'center'} flex={1}>
                <Box paddingBottom={'m'} paddingTop={'xl'} paddingHorizontal={'xxxl'}>
                    <Text variant={'title'} fontSize={28} color={'text'} marginBottom={'s'} textAlign={'center'}>
                        Forgot password?
                    </Text>
                    <Text variant={'text'} color={'registrationText'} textAlign={'center'}>
                        Enter the email address associated with your account
                    </Text>
                </Box>
                <AnimatedBox marginBottom={'m'} marginHorizontal={'l'} style={[style, {borderRadius: 6}]}
                             backgroundColor={'danger'} justifyContent={'center'} alignItems={'center'} p={'xs'}>
                    <Text variant={"title"} color={'mainBg'} fontSize={14} textAlign={'center'}
                          lineHeight={18}>{error}</Text>
                </AnimatedBox>
                <Box width={width} paddingHorizontal={'l'} paddingBottom={'xl'}>
                    <TextInput returnKeyType={'go'} touched={touched.email} error={errors.email}
                               onChangeText={handleChange('email')} onBlur={handleBlur('email')}
                               value={values.email} style={{marginBottom: 30}}
                               placeholder={'Enter your email'} icon={'mail'}
                               autoCompleteType={'email'} onSubmitEditing={() => handleSubmit()}/>
                    <Box alignItems={'center'}>
                        <Button onPress={() => handleSubmit()} label={'Reset password'}
                                variant={'primary'}/>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
};

