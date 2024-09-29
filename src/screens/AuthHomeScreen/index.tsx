import React, { FC } from 'react';
import { ViewStyle, View, TextStyle, useWindowDimensions } from 'react-native';
import { Screen } from '@components/Screen';
import { Text } from '@components/Text';
import { spacing } from 'src/theme/spacing';
import { colors, typography } from '@theme';
import EmailSignIn from './EmailSignIn';
import LottieView from 'lottie-react-native';

export const AuthHomeScreen = () => {
    const windowHeight = useWindowDimensions().height;

    return (
        <Screen
            preset="scroll"
            safeAreaEdges={['top', 'bottom']}
            contentContainerStyle={[$rootContainer, { minHeight: Math.round(windowHeight) }]}>
            <View style={$topContainer}>
                <View>
                    <Text text="Pulse" style={$logoText} />
                </View>
                <View>
                    <EmailSignIn />
                </View>
                <View />
            </View>
        </Screen>
    );
};

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};

const $topContainer: ViewStyle = {
    flexGrow: 1,
    justifyContent: 'space-around',
};

const $logoText: TextStyle = {
    paddingTop: spacing.lg,
    fontSize: spacing.xxl,
    fontFamily: 'logo',
    color: colors.mint[500],
    marginBottom: spacing.xs,
    textAlign: 'center',
};
