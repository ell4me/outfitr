import React from 'react';
import {SuccessPopUp} from "../../SuccessPopUp";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {HomeRoutes} from "../HomeNavigation";
import {AppRoutes} from "../../../../App";


export const SuccessOrder = ({navigation}: ScreenParamsPropsType<'Drawer', HomeRoutes, AppRoutes, 'SuccessOrder'>) => {
    return (
        <SuccessPopUp icon={'check'} buttonText={'Back to outfits'}
                      subTitle={'Order should arrive within 4 working days.'}
                      title={'Congrats! Order successfully placed'} onPress={() => navigation.navigate('OutfitIdeas')}
                      onPressClose={() => navigation.goBack()}/>
    );
};
