import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {RectButton} from "react-native-gesture-handler";


export const AddCreditCard = () => {
    return (
        <RectButton style={{marginRight: 20,height: 120, width: 100, borderRadius: 12, backgroundColor: 'rgba(255,255,255, .05)', alignItems: "center", justifyContent: 'center'}}>
            <Icon name={'plus'} size={35} color={'#fff'}/>
        </RectButton>
    );
};
