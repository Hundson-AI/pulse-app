import { loadAsync } from 'expo-font';
import { Platform } from 'react-native';

export const fonts = {
    openSan: {
        regular: 'openSans_regular',
        regularItalic: 'openSans_regular_italic',
        semiBold: 'openSans_semiBold',
        semiBoldItalic: 'openSans_semiBold_italic',
        bold: 'openSans_bold',
        boldItalic: 'openSans_bold_italic',
    },
    gasoekOne: {
        regular: 'gasoekOne_regular',
    },
    suit: {
        bold: 'bold',
        extraBold: 'extraBold',
        extraLight: 'extraLight',
        light: 'light',
        heavy: 'heavy',
        medium: 'medium',
        semiBold: 'semiBold',
        thin: 'thin',
        regular: 'regular',
    },
};

// preload fonts
export const loadFonts = () =>
    loadAsync({
        openSans_regular: require('@assets/fonts/OpenSans-Regular.ttf'),
        openSans_regular_italic: require('@assets/fonts/OpenSans-Italic.ttf'),
        openSans_semiBold: require('@assets/fonts/OpenSans-Semibold.ttf'),
        openSans_semiBold_italic: require('@assets/fonts/OpenSans-SemiboldItalic.ttf'),
        openSans_bold: require('@assets/fonts/OpenSans-Bold.ttf'),
        openSans_bold_italic: require('@assets/fonts/OpenSans-BoldItalic.ttf'),
        logo: require('@assets/fonts/GasoekOne-Regular.ttf'),
        bold: require('@assets/fonts/SUIT-Bold.ttf'),
        extraBold: require('@assets/fonts/SUIT-ExtraBold.ttf'),
        extraLight: require('@assets/fonts/SUIT-ExtraLight.ttf'),
        light: require('@assets/fonts/SUIT-Light.ttf'),
        heavy: require('@assets/fonts/SUIT-Heavy.ttf'),
        medium: require('@assets/fonts/SUIT-Medium.ttf'),
        semiBold: require('@assets/fonts/SUIT-SemiBold.ttf'),
        thin: require('@assets/fonts/SUIT-Thin.ttf'),
        regular: require('@assets/fonts/SUIT-Regular.ttf'),
    });

export const typography = {
    fonts,
    primary: fonts.suit,
    secondary: Platform.select({ ios: fonts.openSan, android: fonts.openSan }),
};
