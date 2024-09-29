import {
    Pressable,
    PressableProps,
    Text,
    ActivityIndicator,
    GestureResponderEvent,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    ImageStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';
import Image from '../Image';
import { colors, fonts } from '@theme';

export interface ButtonProps
    extends Omit<
        PressableProps,
        | 'title'
        | 'image'
        | 'imageStyle'
        | 'titleStyle'
        | 'onPress'
        | 'onLongPress'
        | 'isLoading'
        | 'loaderColor'
        | 'style'
    > {
    title?: string;
    image?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    titleStyle?: StyleProp<TextStyle>;
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    isLoading?: boolean;
    loaderColor?: string;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    className?: string;
    variant?: 'primary' | 'secondary' | 'dark' | 'neutral' | 'outlined' | 'plain' | 'ghost';
}

function Button({
    title,
    titleStyle,
    image,
    style,
    disabled,
    isLoading,
    loaderColor = colors.white,
    imageStyle,
    children,
    variant = 'primary',
    ...others
}: ButtonProps) {
    const opacityStyle = { opacity: disabled ? 0.6 : 1 };

    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return $primaryButton;
            case 'secondary':
                return $secondaryButton;
            case 'dark':
                return $darkButton;
            case 'neutral':
                return $neutralButton;
            case 'outlined':
                return $outlinedButton;
            case 'ghost':
                return $ghostButton;
            default:
                return {};
        }
    };

    const getButtonTextStyle = () => {
        switch (variant) {
            case 'primary':
                return $buttonTextWhite;
            case 'secondary':
                return $buttonTextWhite;
            case 'dark':
                return $buttonTextWhite;
            case 'neutral':
                return $buttonTextBlack;
            case 'outlined':
                return $buttonTextOutlined;
            case 'ghost':
                return $buttonTextGhost;
            default:
                return $buttonTextBlack;
        }
    };

    return (
        <Pressable
            style={[$button, opacityStyle, getButtonStyle(), style]}
            disabled={disabled ?? isLoading}
            {...others}>
            {children}
            {isLoading && <ActivityIndicator size="small" color={loaderColor} />}
            {!isLoading && image && <Image source={image} style={imageStyle} />}
            {!isLoading && title && (
                <Text style={[$buttonText, getButtonTextStyle()]}>{title}</Text>
            )}
        </Pressable>
    );
}

export default Button;

const $button: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 100,
};

const $darkButton: ViewStyle = {
    backgroundColor: colors.gray[800],
};

const $neutralButton: ViewStyle = {
    backgroundColor: colors.gray[100],
};

const $primaryButton: ViewStyle = {
    backgroundColor: colors.mint[500],
};

const $secondaryButton: ViewStyle = {
    backgroundColor: colors.orange[600],
};

const $outlinedButton: ViewStyle = {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.mint[200],
};

const $ghostButton: ViewStyle = {
    backgroundColor: 'transparent',
};

const $buttonText: TextStyle = {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'semiBold',
    lineHeight: 25,
};

const $buttonTextWhite: TextStyle = {
    color: colors.gray[50],
};

const $buttonTextBlack: TextStyle = {
    color: colors.gray[800],
};

const $buttonTextOutlined: TextStyle = {
    color: colors.mint[200],
};

const $buttonTextGhost: TextStyle = {
    color: colors.gray[200],
};
