import React, {useEffect, useRef, useState} from 'react';
import {Box, Text, Theme} from '../../../utils/theme'
import {useFormik} from "formik";
import {Dimensions, Platform, TextInput as Input} from "react-native";
import * as Yup from "yup";
import {TextInput} from "../../FormElements/TextInput";
import {useTheme} from '@shopify/restyle';
import {RadioGroup} from "../../RadioGroup";
import {SwipeButton} from "../../SwipeButton";
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useTiming} from "react-native-redash";
import {useDispatch, useSelector} from "react-redux";
import {getGenders, getInfoUser, getSavedConfigInfo} from "../../../redux/selectors/config-selector";
import {updatePersonalInfo} from "../../../redux/reducers/config-reducer";
import {useIsFocused} from "@react-navigation/native";

const LoginSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required')
});
const {width} = Dimensions.get('window')
export const Info = ({hideSwipe}: { hideSwipe: boolean }) => {
    const theme = useTheme<Theme>()
    const [disabled, setDisabled] = useState(true)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const anim = useTiming(hideSwipe)
    const genders = useSelector(getGenders)
    const {name} = useSelector(getInfoUser)
    const {genderType, street} = useSelector(getSavedConfigInfo)
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
        values,
        resetForm,
        setValues
    } = useFormik({
        initialValues: {
            name,
            street,
            checkbox: genderType
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            let changeData = {};
            let initialData = {name, street, checkbox: genderType}
            let val: keyof typeof initialData;
            for (val in initialData) {
                if (initialData[val] !== values[val]) {
                    changeData = {...changeData, [val === "checkbox" ? 'genderType' : val]: values[val]}
                }
            }
            if (Object.keys(changeData).length !== 0) {
                dispatch(updatePersonalInfo(changeData))
            }
        },
    });
    const streetRef = useRef<Input>(null)
    const opacity = useAnimatedStyle(() => ({
        opacity: interpolate(anim.value, [0, 1], [1, 0])
    }))

    const onEndedActionCallback = () => {
        handleSubmit()
    }

    useEffect(() => {
        if (isFocused || street || name || genderType) {
            resetForm()
            setValues({name, street, checkbox: genderType})
            setDisabled(true)
        }
    }, [isFocused, street, name, genderType]);
    useEffect(() => {
        if ((values.street !== street || values.name !== name || values.checkbox !== genderType)
            && (!errors.name && !errors.street)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [errors.name,errors.street, values, street, name, genderType])
    console.log(disabled, 'disabled')
    return (
        <Box flex={1}>
            <Text style={{marginBottom: 16}} variant={'text'} fontSize={14} color={'registrationText'}>Account
                information</Text>
            <Box width={width - theme.spacing.l * 2}>
                <TextInput returnKeyType={'next'} touched={touched.name} error={errors.name}
                           onChangeText={handleChange('name')} onBlur={handleBlur('name')}
                           value={values.name} style={{marginBottom: 12}}
                           placeholder={'Enter your name'} icon={'user'}
                           onSubmitEditing={() => streetRef.current?.focus()}/>
                <TextInput ref={streetRef}
                           onChangeText={handleChange('street')}
                           onBlur={handleBlur('street')}
                           value={values.street} style={{marginBottom: 30}}
                           placeholder={'Enter your street'} icon={'map-pin'}
                           autoCompleteType={'street-address'}/>
                <RadioGroup flex={1} initialData={[values.checkbox]}
                            onChangeForm={(value: string) => setFieldValue('checkbox', value)}
                            data={genders} checkbox/>
            </Box>
            {Platform.OS === 'android' ?
                <Animated.View style={[{flex: 1}, opacity]}>
                    <SwipeButton label={'Swipe to save changes'} onEndedActionCallback={onEndedActionCallback}/>
                </Animated.View> :
                <SwipeButton disabled={!disabled} label={'Swipe to save changes'}
                             onEndedActionCallback={onEndedActionCallback}/>
            }
        </Box>
    );
};
