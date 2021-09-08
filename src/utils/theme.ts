import {createBox, createText, createTheme} from '@shopify/restyle'

const palette = {
    blueSuperLight: 'rgba(12,13,52,0.05)',
    blueOpacity1: 'rgba(12,13,52,.1)',
    blueUltraLight: 'rgba(12,13,52, .5)',
    blueSuperUltraLight: 'rgba(12,13,52, .3)',
    blueLightText: 'rgba(12,13,52, .7)',
    bluePrimary: '#0C0D34',

    blackLight: 'rgba(21,22,36,.5)',
    black: '#151624',

    greenPrimary: '#2CB9B0',
    greenPrimaryLight: '#BEECC4',
    greenPrimaryOpacity: 'rgba(44,185,176, .1)',
    white: '#fff',
    whiteOpacity: 'rgba(255,255,255,.2)',
    transparent: 'rgba(0,0,0, 0)',
    checkBoxBg: '#F6F6F6',
    danger: '#E65758',
    borderDefault: '#eee',
    bgDrawer: '#06818E',

    pink: '#FFDDDD',
    blue: '#BFEAF5',
    grey: '#F1E0FF',
    beige: '#FFE8E9',
    brown: '#D5C3BB',
    orange: '#FE5E33',
    yellow: '#FFC641',
    blueLight: '#C9E9E7',
    patternTransaction: '#111747',
};


const theme = createTheme({
    colors: {
        mainBg: palette.white,
        primary: palette.greenPrimary,
        primaryOpacity: palette.greenPrimaryOpacity,
        buttonGrayBg: palette.blueSuperLight,
        buttonTransparentBg: palette.transparent,
        text: palette.bluePrimary,
        textLight: palette.blueLightText,
        textInput: palette.black,
        textPlaceholder: palette.blackLight,
        checkbox: palette.checkBoxBg,
        registrationText: palette.blueUltraLight,
        danger: palette.danger,
        borderDefault: palette.borderDefault,
        bgDrawer: palette.bgDrawer,
        avatarBg: palette.greenPrimaryLight,
        pink: palette.pink,
        blue: palette.blue,
        grey: palette.grey,
        beige: palette.beige,
        brown: palette.brown,
        whiteOpacity: palette.whiteOpacity,
        pattern: palette.patternTransaction,
        total: palette.blueSuperUltraLight,
        orange: palette.orange,
        yellow: palette.yellow,
        roundedBorderGroup: palette.blueOpacity1,
        product: palette.blueLight,
    },
    spacing: {
        xs: 8,
        s: 12,
        m: 20,
        l: 36,
        xl: 40,
        xxl: 50,
        xxxl: 60
    },
    borderRadii: {
        checkbox: 2,
        s: 25,
        m: 40,
        l: 60,
        xl: 80,
        none: 0
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
    textVariants: {
        title: {
            fontFamily: 'SFProText-Semibold',
            fontSize: 24,
            lineHeight: 30,
            color: 'text',
        },
        text: {
            fontFamily: 'SFProText-Regular',
            fontSize: 16,
            lineHeight: 24,
            color: 'textLight',
        },
        textBtn: {
            fontFamily: 'SFProText-Medium',
            fontSize: 15
        },
        onBoardingTitle: {
            fontSize: 80,
            fontFamily: 'SFProText-Bold',
            color: 'mainBg'
        }
    },
});

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export type Theme = typeof theme;
export default theme;
