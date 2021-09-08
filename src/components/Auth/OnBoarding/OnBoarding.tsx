import React, {useRef} from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Image
} from "react-native";
import {Slide} from "./Slide";
import {SubSlide} from "./SubSlide";
import {Dot} from "./Dot";
import {Box, Theme} from "../../../utils/theme";
import {makeStyles} from "../../../hooks/useStyles";
import {ScreenParamsPropsType} from "../../../utils/ScreenParamsPropsType";
import {AuthStackParamList} from "../AuthenticationNavigation";
import {AppRoutes} from "../../../../App";
import {useSelector} from "react-redux";
import {getSlides} from "../../../redux/selectors/app-selector";


const {width, height} = Dimensions.get('window')
export const SLIDE_HEIGHT = height * 0.65

export const OnBoarding = ({navigation}: ScreenParamsPropsType<'Stack', AuthStackParamList, AppRoutes, 'onBoarding'>) => {
    const anim = useRef(new Animated.Value(0)).current
    const scroll = useRef(null)
    const styles = useStyles()
    const slides = useSelector(getSlides)
    const onScroll = Animated.event([{
        nativeEvent: {contentOffset: {x: anim}}
    }], {useNativeDriver: false})

    const bg = anim.interpolate({
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(({color}) => color)
    })
    return (
        <Box style={styles.container} backgroundColor={'mainBg'}>
            <Animated.View style={[styles.slide, {backgroundColor: bg}]}>
                {slides.map(({asset}, i) => {
                    const ratio = asset.height / asset.width
                    const height = (ratio * (width - 80))
                    const opacity = anim.interpolate({
                        inputRange: [(i - 0.9) * width, i * width, (i + 0.9) * width],
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp'
                    })
                    return(
                        <Animated.View key={i} style={[styles.image, {opacity}]}>
                            <Image source={asset.src} style={{height, width: width - 80}}/>
                        </Animated.View>
                    )
                })}
                <Animated.ScrollView ref={scroll} {...{onScroll}}
                                     contentContainerStyle={{width: slides.length * width}}
                                     bounces={false} horizontal
                                     showsHorizontalScrollIndicator={false}
                                     snapToInterval={width}
                                     scrollEventThrottle={1} decelerationRate={'fast'}>
                    {slides.map(({title}, i) => <Slide key={i} height={SLIDE_HEIGHT} title={title}
                                                       right={!((i + 1) % 2)}/>)}
                </Animated.ScrollView>
            </Animated.View>
            <Box style={styles.container}>
                <Animated.View style={{...StyleSheet.absoluteFillObject, backgroundColor: bg}}/>
                <Box style={styles.container} backgroundColor={'mainBg'} borderTopLeftRadius={'xl'}>
                    <Box style={[styles.wrapperDots]}>
                        {slides.map((_, i) => <Dot index={i} currentIndex={Animated.divide(anim, width)} key={i}/>)}
                    </Box>
                    <Animated.View
                        style={[styles.footerContent, {width: width * slides.length, transform: [{translateX: Animated.multiply(anim, -1)}]}]}>
                        {slides.map(({subtitle, desc}, index) =>
                            <SubSlide onPress={() => {
                                if(index === slides.length - 1){
                                    navigation.navigate('Welcome')
                                } else {
                                    // @ts-ignore
                                    scroll.current?.scrollTo({x: width * (index + 1), animated: true})
                                }
                            }} key={index} last={index === slides.length - 1} desc={desc} subtitle={subtitle}/>)}
                    </Animated.View>
                </Box>
            </Box>
        </Box>
    );
};


const useStyles = makeStyles((theme: Theme) => StyleSheet.create({
    container: {
        flex: 1
    },
    wrapperDots: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    slide: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: theme.borderRadii.xl
    },
    image: {
        justifyContent: "flex-end",
        alignItems: "center",
        ...StyleSheet.absoluteFillObject
    },
    footerContent: {
        borderTopLeftRadius: theme.borderRadii.xl,
        flex: 1,
        flexDirection: 'row',
    }
}))

