import {OnBoarding} from "./OnBoarding";
import {Welcome} from "./OnBoarding/Welcome";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Login} from "./Registration/Login";
import {SignUp} from "./Registration/SignUp";
import {ForgotPassword} from "./Registration/ForgotPassword";
import {ResetPassword} from "./Registration/ResetPassword";
import {ConfigMain} from "./Configuration/ConfigMain";
import {OutfitGenerator} from "./Configuration/OutfitGenerator";

const Auth = createStackNavigator<AuthStackParamList>()
export const AuthenticationNavigation = () => {
    return(
        <Auth.Navigator headerMode='none'>
            <Auth.Screen name={'onBoarding'} component={OnBoarding} />
            <Auth.Screen name={'Welcome'} component={Welcome} />
            <Auth.Screen name={'Login'} component={Login} />
            <Auth.Screen name={'SignUp'} component={SignUp} />
            <Auth.Screen name={'ForgotPassword'} component={ForgotPassword} />
            <Auth.Screen name={'ResetPassword'} component={ResetPassword} />
            <Auth.Screen name={'Config'} component={ConfigMain} />
            <Auth.Screen name={'OutfitGenerator'} component={OutfitGenerator} />
        </Auth.Navigator>
    )
}

export type AuthStackParamList = {
    onBoarding: undefined
    Welcome: undefined
    Login: undefined
    SignUp: undefined
    ForgotPassword: undefined
    ResetPassword: undefined
    Config: undefined
    OutfitGenerator: undefined
}
