import React, {useEffect, useRef} from 'react';
import {Dimensions, TextInput as Input} from "react-native";
import {Box, Text} from '../../../utils/theme'
import {Container} from "../../Container";
import {SocialFooter} from "../../footers/SocialFooter";
import {TextInput} from "../../FormElements/TextInput";
import {Checkbox} from "../../FormElements/Checkbox";
import {BorderlessButton} from "react-native-gesture-handler";
import {Button} from '../../FormElements/Button';
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {AppRoutes} from "../../../../App";
import {CommonActions} from "@react-navigation/native";
import {AnimatedBox} from "../../../constants";
import {useAnimatedStyle} from "react-native-reanimated";
import {useDispatch, useSelector} from "react-redux";
import {getAppError} from "../../../redux/selectors/app-selector";
import {useTiming} from "react-native-redash";
import {signInUser} from "../../../redux/reducers/app-reducer";


const {width} = Dimensions.get('window')
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export const Login = ({navigation}: ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'Login'>) => {
    const error = useSelector(getAppError)
    const anim = useTiming(!!error)
    const dispatch = useDispatch()
    const {handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched, values, setFieldError} = useFormik({
        initialValues: {
            email: '',
            password: '',
            checkbox: false
        },
        validationSchema: LoginSchema,
        onSubmit: ({email,password}) => {
            const redirect = () => {
                navigation.dispatch(CommonActions.reset({
                    index: 1,
                    routes: [{name: 'Home'}]
                }))
            }
            dispatch(signInUser(email, password, redirect))
        },
    });
    const passwordRef = useRef<Input>(null)
    useEffect(() => {
        if(error) {
            setFieldError('email', error)
            setFieldError('password', error)
        }
    }, [error])
    const style = useAnimatedStyle(() => ({
        opacity: anim.value
    }))
    return (
        <Container pattern={0} footer={<SocialFooter action={'Sign Up here'} label={'Don’t have an account? '} onPress={() => navigation.navigate('SignUp')} />}>
            <Box flex={1} justifyContent={'center'}>
                <Box paddingBottom={'m'} paddingTop={'xl'} paddingHorizontal={'xxxl'}>
                    <Text variant={'title'} fontSize={28} color={'text'}  marginBottom={'s'} textAlign={'center'}>Welcome
                        back</Text>
                    <Text variant={'text'} color={'registrationText'} textAlign={'center'}>
                        Use your credentials below and login to your account
                    </Text>
                </Box>
                <AnimatedBox marginBottom={'m'} marginHorizontal={'l'} style={[style, {borderRadius: 6}]}
                             backgroundColor={'danger'} justifyContent={'center'} alignItems={'center'} p={'xs'}>
                    <Text variant={"title"} color={'mainBg'} fontSize={14} textAlign={'center'}
                          lineHeight={18}>{error}</Text>
                </AnimatedBox>
                <Box width={width} paddingHorizontal={'l'} paddingBottom={'xl'}>
                    <TextInput returnKeyType={'next'} touched={touched.email} error={errors.email}
                               onChangeText={handleChange('email')} onBlur={handleBlur('email')}
                               value={values.email} style={{marginBottom: 12}}
                               placeholder={'Enter your email'} icon={'mail'}
                               autoCompleteType={'email'} onSubmitEditing={() => passwordRef.current?.focus()}/>
                    <TextInput ref={passwordRef} returnKeyType={'go'} touched={touched.password} error={errors.password}
                               onChangeText={handleChange('password')}
                               onBlur={handleBlur('password')}
                               value={values.password} style={{marginBottom: 24}}
                               placeholder={'Enter your password'} icon={'lock'}
                               autoCompleteType={'password'} onSubmitEditing={() => handleSubmit()} secureTextEntry/>
                    <Box marginBottom={'xl'} alignItems={'center'} justifyContent={'space-between'}
                         flexDirection={'row'}>
                        <Checkbox label={'Remember me'} value={values.checkbox}
                                  onChange={() => setFieldValue('checkbox', !values.checkbox)}/>
                        <BorderlessButton onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text variant={'textBtn'} color={'primary'}>Forgot password</Text>
                        </BorderlessButton>
                    </Box>
                    <Box alignItems={'center'}>
                        <Button onPress={() => handleSubmit()} label={'Log into your account'}
                                variant={'primary'}/>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
};

