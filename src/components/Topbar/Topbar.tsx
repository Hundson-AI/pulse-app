import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import Close from '@assets/svgs/close.svg';

interface TopbarProps {
    type?: 'default' | 'close' | 'market';
    onClose?: () => void;
    onBack?: () => void;
}

const Topbar: FC<TopbarProps> = ({ type = 'default', onClose }) => {
    const getTopbarStyle = () => {
        switch (type) {
            case 'close':
                return $TopbarSpaceBetween;
            default:
                return $TopbarCenter;
        }
    };

    return (
        <View style={[$Topbar, getTopbarStyle()]}>
            <Text style={$Logo}>PULSE</Text>
            {type === 'close' && (
                <Pressable onPress={onClose} style={{ padding: 10 }}>
                    <Close />
                </Pressable>
            )}
        </View>
    );
};

export default Topbar;

const $Logo: TextStyle = {
    fontSize: 36,
    color: colors.mint[500],
    fontFamily: 'logo',
};

const $Topbar: ViewStyle = {
    height: 78,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    backgroundColor: colors.background.light,
};

const $TopbarCenter: ViewStyle = {
    justifyContent: 'center',
};

const $TopbarSpaceBetween: ViewStyle = {
    justifyContent: 'space-between',
};
