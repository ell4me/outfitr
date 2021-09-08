import React, {ReactElement, useCallback, useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Asset} from "expo-asset";
import * as Font from "expo-font";
import {InitialState, NavigationContainer} from "@react-navigation/native";
import Constants from "expo-constants";
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import {Animated, Dimensions, StyleSheet} from "react-native";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest?.sdkVersion}`;

export type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (promises: Promise<void | void[] | Asset[]>[], cb: () => void) =>
    useEffect(() => {
        (async () => {
            await Promise.all(promises);
            cb();
        })();
    });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
    const [ready, setReady] = useState(false);
    usePromiseAll(
        [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
        () => setReady(true)
    );
    return ready;
};

interface LoadAssetsProps {
    fonts?: FontSource;
    assets?: number[];
    children: ReactElement | ReactElement[];
}

const {width, height} = Dimensions.get('window')
export const LoadAssets = ({assets, fonts, children}: LoadAssetsProps) => {
    const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
    const [initialState, setInitialState] = useState<InitialState | undefined>();
    const ready = useLoadAssets(assets || [], fonts || {});
    const [splashHide, setSplashHide] = useState(false)
    const [hideImg, setHideImg] = useState(true)
    const anim = useRef(new Animated.Value(1)).current
    useEffect(() => {
        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem(
                    NAVIGATION_STATE_KEY
                );
                const state = savedStateString
                    ? JSON.parse(savedStateString)
                    : undefined;
                setInitialState(state);
            } finally {
                setIsNavigationReady(true);
            }
        };

        if (!isNavigationReady) {
            restoreState();
        }
    }, [isNavigationReady]);
    const onStateChange = useCallback(
        (state) =>
            AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
        []
    );

   useEffect(() => {
        if (splashHide) {
            Animated.timing(anim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start(() => setHideImg(false));
        }
    }, [splashHide])
    const onLoad = async () => {
        await SplashScreen.hideAsync();
        // do some stuff
        setSplashHide(true)
    }

    if (!ready || !isNavigationReady) {
        return <AppLoading autoHideSplash={false}/>;
    }
    return (
        <NavigationContainer {...{onStateChange, initialState}}>
            {children}
            {hideImg && <Animated.Image style={{
                flex: 1,
                width,
                height,
                opacity: anim,
                transform: [{scale: anim}], ...StyleSheet.absoluteFillObject
            }} resizeMode={'contain'} source={require('../../../assets/splash.png')} onLoad={onLoad}/> }
        </NavigationContainer>
    );
};

