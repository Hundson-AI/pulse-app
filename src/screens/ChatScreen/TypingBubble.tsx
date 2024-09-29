import { colors } from '@theme';
import React, { useRef, useEffect } from 'react';
import { View, Animated, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';

const AnimatedDot = Animated.createAnimatedComponent(View);

const TypingBubble = () => {
    const bounceValue1 = useRef(new Animated.Value(1)).current;
    const bounceValue2 = useRef(new Animated.Value(1)).current;
    const bounceValue3 = useRef(new Animated.Value(1)).current;

    const animateDot = (value: Animated.Value) => {
        return Animated.sequence([
            Animated.timing(value, {
                toValue: 0.6,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(value, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]);
    };

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                animateDot(bounceValue1),
                Animated.delay(70), // pause between dots
                animateDot(bounceValue2),
                Animated.delay(70), // pause between dots
                animateDot(bounceValue3),
                Animated.delay(400), // slight pause after all dots have bounced
            ]),
        ).start();

        return () => {
            Animated.loop(
                Animated.sequence([
                    animateDot(bounceValue1),
                    Animated.delay(70), // pause between dots
                    animateDot(bounceValue2),
                    Animated.delay(70), // pause between dots
                    animateDot(bounceValue3),
                    Animated.delay(400), // slight pause after all dots have bounced
                ]),
            ).stop();
        };
    }, []);

    return (
        <View style={$container}>
            <AnimatedDot style={[$dot, { transform: [{ scale: bounceValue1 }] }]} />
            <AnimatedDot style={[$dot, { transform: [{ scale: bounceValue2 }] }]} />
            <AnimatedDot style={[$dot, { transform: [{ scale: bounceValue3 }] }]} />
        </View>
    );
};

const $container: ViewStyle = {
    padding: spacing.sm,
    marginRight: 20,
    marginTop: spacing.xs,

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: spacing.xxxl,
    backgroundColor: colors.white,

    marginLeft: spacing.md,
    borderRadius: spacing.mlg,
};

const $dot: ViewStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.mint[500],
};

export default TypingBubble;
