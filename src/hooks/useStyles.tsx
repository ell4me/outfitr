import {Theme} from "../utils/theme";
import {useTheme} from "@shopify/restyle";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles = <T extends NamedStyles<T>>(styles: (theme: Theme) => T) => () => {
    const theme = useTheme<Theme>()
    return styles(theme)
}

