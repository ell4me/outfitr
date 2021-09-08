import {StackNavigationProp} from "@react-navigation/stack";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {ParamListBase, RouteProp, CompositeNavigationProp} from "@react-navigation/native";


export type ScreenParamsPropsType<Primary extends 'Drawer' | 'Stack', ParamPrimaryList extends ParamListBase,
    ParamParentList extends ParamListBase,
    KeyParamPrimaryList extends keyof ParamPrimaryList = string> = Primary extends 'Drawer' ? {
    navigation: CompositeNavigationProp<// @ts-ignore
        DrawerNavigationProp<ParamPrimaryList, KeyParamPrimaryList>, StackNavigationProp<ParamParentList>>
    route: RouteProp<ParamPrimaryList, KeyParamPrimaryList>
} : {
    navigation: CompositeNavigationProp<// @ts-ignore
        StackNavigationProp<ParamPrimaryList, KeyParamPrimaryList>, StackNavigationProp<ParamParentList>>
    route: RouteProp<ParamPrimaryList, KeyParamPrimaryList>
}

