import React, { FC, useEffect, useRef } from 'react';
import { Animated, Pressable, ViewStyle } from 'react-native';
import { Text } from '@components/Text';
import HeartIcon from '@components/svgs/HeartIcon';
import HeartWarningIcon from '@components/svgs/HeartWarningIcon';
import { ChatMode } from '@modules/chat-mode/chat-mode.slice';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';

interface Props {
	mode: ChatMode;
	disabled?: boolean;
	onPress?: () => void;
}

const ChatModeButton: FC<Props> = ({ disabled, mode, onPress }) => {
	const isRegular = mode === ChatMode.REGULAR;

	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const toValue = disabled ? 1 : isRegular ? 0 : 2;

		Animated.timing(animatedValue, {
			toValue,
			duration: 500,
			useNativeDriver: false,
		}).start();
	}, [isRegular, disabled]);

	const backgroundColor = animatedValue.interpolate({
		inputRange: [0, 1, 2], // 0 = regular, 1 = secret, 2 = disabled
		outputRange: [colors.mint[500], colors.gray[200], colors.orange[500]],
	});

	return (
		<Pressable onPress={onPress} disabled={disabled}>
			<Animated.View style={[$button, { backgroundColor }]}>
				{isRegular ? <HeartIcon /> : <HeartWarningIcon />}
				<Text
					text={isRegular ? '펄스모드' : '비밀모드'}
					weight='bold'
					size='sm'
					style={{ color: colors.white, marginLeft: spacing.xxs }}
				/>
			</Animated.View>
		</Pressable>
	);
};

export default ChatModeButton;

const $button: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 999,
	height: 38,
	paddingHorizontal: spacing.mlg,
};
