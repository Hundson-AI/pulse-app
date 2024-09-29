import React, { FC, useEffect, useRef } from 'react';
import { Pressable, PressableProps, ViewStyle, Animated } from 'react-native'; // Import Animated
import ActionIcon from '@components/svgs/ActionIcon';
import SmileIcon from '@components/svgs/SmileIcon';
import { Text } from '@components/Text';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';

export enum MessageType {
    TEXT = 'text',
    ACTION = 'action',
}

interface Props extends PressableProps {
    currentType: MessageType;
    setType: (type: MessageType) => void;
    isVisible?: boolean;
}

const InputToolbar: FC<Props> = ({ currentType, setType, isVisible = true }) => {
    const opacity = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: isVisible ? 0.9 : 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    return (
        <Animated.View
            style={[
                $typeButton,
                {
                    opacity: opacity,
                },
            ]}>
            <Pressable
                style={$innerPressable}
                onPress={() =>
                    setType(
                        currentType === MessageType.TEXT ? MessageType.ACTION : MessageType.TEXT,
                    )
                }>
                {currentType !== MessageType.TEXT ? (
                    <SmileIcon fill={colors.white} height={20} width={20} />
                ) : (
                    <ActionIcon fill={colors.white} height={20} width={20} />
                )}
                <Text
                    weight="medium"
                    size="xs"
                    style={{ color: colors.white }}
                    text={currentType !== MessageType.TEXT ? '대화' : '액션'}
                />
            </Pressable>
        </Animated.View>
    );
};

export default InputToolbar;

const $typeButton: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xsm,
    backgroundColor: colors.gray[400],
    width: 70,
    borderRadius: 999,
};

const $innerPressable: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
};
