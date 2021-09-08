import React, {useEffect, useRef} from 'react';
import {Dimensions, TextInput as Input} from "react-native";
import {Container} from "../../Container";
import {SocialFooter} from "../../footers/SocialFooter";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import {Box, Text} from "../../../utils/theme";
import {TextInput} from "../../FormElements/TextInput";
import {Button} from "../../FormElements/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {AppRoutes} from "../../../../App";
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {getAppError} from "../../../redux/selectors/app-selector";
import {signUpUser} from "../../../redux/reducers/app-reducer";
import {AnimatedBox} from "../../../constants";
import {useAnimatedStyle} from "react-native-reanimated";
import {useTiming} from "react-native-redash";

const {width} = Dimensions.get('window')
const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match!').required('Required')
});
export const SignUp = ({navigation}: ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'SignUp'>) => {
    const error = useSelector(getAppError)
    const anim = useTiming(!!error)
    const dispatch = useDispatch()
    const {handleChange, handleBlur, handleSubmit, errors, touched, values, setFieldError} = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SignUpSchema,
        onSubmit: ({email, password}) => {
            const redirect = () => {
                navigation.dispatch(CommonActions.reset({
                    index: 1,
                    routes: [
                        {name: 'Config'}
                    ]
                }))
            }
            dispatch(signUpUser(email, password, redirect))
            console.log(values);
        },
    });

    const passwordRef = useRef<Input>(null)
    const confirmPasswordRef = useRef<Input>(null)
    useEffect(() => {
        if(error) {
            setFieldError('email', error)
        }
    }, [error])
    const style = useAnimatedStyle(() => ({
        opacity: anim.value
    }))
    return (
        <Container border={'left'} pattern={1} footer={<SocialFooter onPress={() => navigation.navigate('Login')}
                                                                     label={'Already have an account? '}
                                                                     action={'Login here'}/>}>
            <Box flex={1} justifyContent={'center'}>
                <Box paddingBottom={'m'} paddingTop={'xl'} paddingHorizontal={'xxxl'}>
                    <Text variant={'title'} fontSize={28} color={'text'} marginBottom={'s'} textAlign={'center'}>
                        Create account
                    </Text>
                    <Text variant={'text'} color={'registrationText'} textAlign={'center'}>
                        Let’s us know what your name, email, and your password
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
                               onSubmitEditing={() => passwordRef.current?.focus()}/>
                    <TextInput ref={passwordRef} returnKeyType={'next'} touched={touched.password}
                               error={errors.password}
                               onChangeText={handleChange('password')}
                               onBlur={handleBlur('password')}
                               value={values.password} style={{marginBottom: 12}}
                               placeholder={'Enter your password'} icon={'lock'}
                               onSubmitEditing={() => confirmPasswordRef.current?.focus()} secureTextEntry/>
                    <TextInput ref={confirmPasswordRef} returnKeyType={'go'} touched={touched.confirmPassword}
                               error={errors.confirmPassword}
                               onChangeText={handleChange('confirmPassword')}
                               onBlur={handleBlur('confirmPassword')}
                               value={values.confirmPassword} style={{marginBottom: 40}}
                               placeholder={'Confirm password'} icon={'lock'}
                               onSubmitEditing={() => handleSubmit()} secureTextEntry/>
                    <Box alignItems={'center'}>
                        <Button onPress={() => handleSubmit()} label={'Sign up your account'}
                                variant={'primary'}/>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
