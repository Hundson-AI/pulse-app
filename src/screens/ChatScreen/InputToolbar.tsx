import React, { FC, useEffect, useRef } from 'react';
import { Pressable, ViewStyle, Animated } from 'react-native'; // Import Animated
import ActionIcon from '@components/svgs/ActionIcon';
import SmileIcon from '@components/svgs/SmileIcon';
import { Text } from '@components/Text';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import PlusIcon from '@components/svgs/PlusIcon';
import { useSelector } from 'react-redux';
import {
	MessageType,
	selectChatInputByIndex,
	selectChatInputCount,
	selectChatInputFocused,
	useChatInput,
} from '@modules/chat-input/chat-input.slice';
import { State } from '@modules/store';

const InputToolbar = ({}) => {
	const currentlyFocusedIdx = useSelector(selectChatInputFocused);
	console.log('currentlyFocusedIdx', currentlyFocusedIdx);
	const inputCount = useSelector(selectChatInputCount);
	const isVisible = currentlyFocusedIdx !== null;
	const focusedInput = useSelector((state: State) =>
		selectChatInputByIndex(state, currentlyFocusedIdx)
	);
	const lastInput = useSelector((state: State) =>
		selectChatInputByIndex(state, 0)
	);
	const { editInputType, dispatch, add } = useChatInput();

	const currentType = focusedInput?.type;

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
				$buttonContainer,
				{
					opacity: opacity,
				},
			]}
		>
			<Pressable
				style={[$button, { width: 70 }]}
				onPress={() => {
					if (currentlyFocusedIdx !== null) {
						dispatch(
							editInputType({
								index: currentlyFocusedIdx,
								type:
									currentType === MessageType.TEXT
										? MessageType.ACTION
										: MessageType.TEXT,
							})
						);
					}
				}}
			>
				{currentType !== MessageType.TEXT ? (
					<SmileIcon fill={colors.white} height={20} width={20} />
				) : (
					<ActionIcon fill={colors.white} height={20} width={20} />
				)}
				<Text
					weight='medium'
					size='xs'
					style={{ color: colors.white }}
					text={currentType !== MessageType.TEXT ? '대화' : '액션'}
				/>
			</Pressable>
			{inputCount < 4 && (
				<Pressable
					style={$button}
					onPress={() =>
						dispatch(
							add({
								text: '',
								type:
									lastInput?.type === MessageType.TEXT
										? MessageType.ACTION
										: MessageType.TEXT,
							})
						)
					}
				>
					<PlusIcon fill={colors.white} height={20} width={20} />
				</Pressable>
			)}
		</Animated.View>
	);
};

export default InputToolbar;

const $buttonContainer: ViewStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'center',
	columnGap: spacing.xxs,
};

const $button: ViewStyle = {
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: spacing.xsm,
	backgroundColor: colors.gray[400],
	borderRadius: 999,
};
