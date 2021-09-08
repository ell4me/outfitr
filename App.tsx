import 'react-native-gesture-handler';
import * as React from 'react';
import {LoadAssets} from "./src/components/LoadAssets";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { ThemeProvider } from '@shopify/restyle';
import theme from "./src/utils/theme";
import {AuthenticationNavigation, AuthStackParamList} from "./src/components/Auth/AuthenticationNavigation";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeNavigation, HomeRoutes} from "./src/components/Home/HomeNavigation";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";


const AppStack = createStackNavigator<AppRoutes>()
export type AppRoutes = {
    Auth: { screen: keyof AuthStackParamList } | undefined
    Home: { screen: keyof HomeRoutes, params?: {id: number} } | undefined
}
const fonts = {
    "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
    "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    "SFProText-Medium": require("./assets/fonts/SFProDisplay-Medium.ttf"),
};
const patterns = [
    require('./assets/patterns/drawerPattern.png'),
    require('./assets/patterns/outfitPattern.png'),
    require('./assets/patterns/patternNotifications.png'),
    require('./assets/patterns/transactionPattern.png'),
    require('./assets/patterns/1.png'),
    require('./assets/patterns/2.png'),
    require('./assets/patterns/3.png'),
    require('./assets/patterns/0.png'),
    require('./assets/preloader.gif')
]
const assetOnBoarding = [
    require('./assets/models/11.png'),
    require('./assets/models/8.png'),
    require('./assets/models/10.png'),
    require('./assets/models/3.png'),
    require('./assets/models/1.png'),
    require('./assets/models/4.png')
]


const assets = [...patterns, ...assetOnBoarding]
export default function App() {
  return (
      <LoadAssets {...{fonts}} assets={assets}>
          <Provider store={store}>
              <SafeAreaProvider>
                  <ThemeProvider theme={theme}>
                      <StatusBar style={'dark'}/>
                      <AppStack.Navigator headerMode='none'>
                          <AppStack.Screen name={'Auth'} component={AuthenticationNavigation}/>
                          <AppStack.Screen name={'Home'} component={HomeNavigation}/>
                      </AppStack.Navigator>
                  </ThemeProvider>
              </SafeAreaProvider>
          </Provider>
      </LoadAssets>
  );
}
