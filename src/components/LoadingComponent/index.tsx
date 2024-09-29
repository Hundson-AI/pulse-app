import React from 'react';

import { TextStyle, View, ViewStyle } from 'react-native';
import { colors } from '@theme';
import { Text } from '@components/Text';

const LoadingComponent = () => {
    return (
        <View style={$container}>
            <Text style={$Logo}>PULSE</Text>
        </View>
    );
};

export default LoadingComponent;

const $container: ViewStyle = {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.light,
};

const $Logo: TextStyle = {
    fontSize: 36,
    color: colors.mint[500],
    fontFamily: 'logo',
    lineHeight: 42,
};
