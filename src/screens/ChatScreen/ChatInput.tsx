import React, { FC, useRef } from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';
import SmileIcon from '@components/svgs/SmileIcon';
import ActionIcon from '@components/svgs/ActionIcon';
import { TextField } from '@components/TextField';
import {
	MessageType,
	selectChatInputByIndex,
	selectChatInputCount,
	useChatInput,
} from '@modules/chat-input/chat-input.slice';
import { useSelector } from 'react-redux';
import { State } from '@modules/store';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import CloseIcon from '@components/svgs/CloseIcon';

interface Props {
	idx: number;
}

const ChatInput: FC<Props> = ({ idx }) => {
	const textInputRef = useRef(null);
	const { focus, blur, edit, dispatch, remove } = useChatInput();
	const inputCount = useSelector(selectChatInputCount);
	const chatInput = useSelector((state: State) =>
		selectChatInputByIndex(state, idx)
	);
	const isFirst = idx === inputCount - 1;

	if (!chatInput) return null;

	const { text, type } = chatInput;

	const onChangeText = (text: string) => {
		dispatch(edit({ index: idx, input: { text, type } }));
	};

	const removeInput = () => {
		dispatch(remove(idx));
	};

	return (
		<View
			style={[
				$inputContainer,
				{
					paddingRight: isFirst ? spacing.md : spacing.sm,
				},
			]}
		>
			<View style={$typeContainer}>
				{type === MessageType.TEXT ? (
					<SmileIcon fill={colors.gray[300]} />
				) : (
					<ActionIcon fill={colors.gray[300]} />
				)}
			</View>
			<TextField
				ref={textInputRef}
				containerStyle={[
					$textfieldContainer,
					{
						marginLeft: isFirst ? 0 : spacing.sm,
					},
				]}
				inputWrapperStyle={$textfieldInputWrapper}
				style={$textfield}
				multiline={true}
				onChangeText={onChangeText}
				value={text}
				onFocus={() => dispatch(focus(idx))}
				onBlur={() => dispatch(blur())}
			/>
			{!isFirst && (
				<View style={$typeContainer}>
					<Pressable onPress={removeInput}>
						<CloseIcon fill={colors.gray[300]} />
					</Pressable>
				</View>
			)}
		</View>
	);
};

export default ChatInput;

const $inputContainer: ViewStyle = {
	flex: 1,
	flexDirection: 'row',
	backgroundColor: colors.gray[100],
	borderRadius: 999,
	alignItems: 'center',
	marginRight: 6,
	paddingHorizontal: spacing.md,
};

const $typeContainer: ViewStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	paddingRight: spacing.xxs,
};

const $textfieldContainer: ViewStyle = {
	flex: 1,
	marginRight: spacing.sm,
};

const $textfieldInputWrapper: ViewStyle = {
	borderWidth: 0,
	backgroundColor: colors.gray[100],
	borderRadius: 30,
	minHeight: 0,
	paddingHorizontal: spacing.xxs,
};

const $textfield: TextStyle = {
	alignSelf: 'flex-start',
	marginLeft: 0,
	marginTop: spacing.sm,
	maxHeight: 100,
};
