import React from 'react';
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import {SuccessPopUp} from "../../SuccessPopUp";
import {AppRoutes} from "../../../../App";


export const ResetPassword = ({navigation}: ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'ResetPassword'>) => {
    return <SuccessPopUp title={'We have sent an email to change your password'} icon={'check'}
                      buttonText={'Login again'} subTitle={'Close this window and login again'}
                      onPress={() => navigation.navigate('Login')} onPressClose={() => navigation.pop()}/>
};


