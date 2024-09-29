import { Icon, IconTypes } from '@components/Icon/Icon';
import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
    title: string;
    onPress?: () => void;
    variant?: 'default' | 'outlined' | 'mint';
    style?: ViewStyle;
    disabled?: boolean;
    icon?: IconTypes;
}

const Chip: FC<Props> = ({ title, onPress, variant = 'default', style, disabled, icon }) => {
    const opacityStyle = { opacity: disabled ? 0.6 : 1 };

    const getChipStyle = () => {
        switch (variant) {
            case 'default':
                return [$chip, $defaultChip];
            case 'outlined':
                return [$chip, $outlinedChip];
            case 'mint':
                return [$chip, $defaultChip, { backgroundColor: colors.mint[500] }];
            default:
                return [$chip, $defaultChip];
        }
    };

    const getChipTextStyle = () => {
        switch (variant) {
            case 'default':
                return $ChipTextWhite;
            case 'outlined':
                return $ChipTextBlack;
            case 'mint':
                return $ChipTextWhite;
            default:
                return $ChipTextWhite;
        }
    };

    return (
        <TouchableOpacity
            onPress={disabled ? undefined : onPress}
            style={[getChipStyle(), opacityStyle, style]}>
            <Text size="lg" style={getChipTextStyle()}>
                {title}
            </Text>
            {icon && <Icon icon={icon} style={{ marginLeft: 10 }} />}
        </TouchableOpacity>
    );
};

export default Chip;

const $chip: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 9,
};

const $defaultChip: ViewStyle = {
    backgroundColor: colors.gray[950],
};

const $outlinedChip: ViewStyle = {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray[950],
};

const $ChipTextWhite: TextStyle = {
    color: colors.white,
    lineHeight: 26,
};

const $ChipTextBlack: TextStyle = {
    color: colors.gray[800],
    lineHeight: 26,
};
