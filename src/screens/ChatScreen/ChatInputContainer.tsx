import { TextStyle, View, ViewStyle, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';

import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import { TextField } from '@components/TextField';
import {
	addChatHistory,
	ChatHistoryItem,
	ChatRole,
	selectChatRoomId,
} from '@modules/chat-history/chat-history.slice';
import { sendChatMessage } from 'src/ws/chats.ws';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import SendIcon from '@components/svgs/SendIcon';
import InputToolbar from './InputToolbar';
import { TEMP_USERNAME } from 'src/constants/temp';
import {
	MessageType,
	selectChatInputCount,
	selectChatInputsSendable,
	useChatInput,
} from '@modules/chat-input/chat-input.slice';
import ChatInput from './ChatInput';

const ChatInputContainer = () => {
	const chatId = useSelector(selectChatRoomId);
	const { inputs, clear, dispatch } = useChatInput();
	const inputCount = useSelector(selectChatInputCount);
	const readyToSend = useSelector(selectChatInputsSendable);

	const handleSend = async () => {
		try {
			const reversedInputs = [...inputs].reverse();
			let message = reversedInputs
				.map((input) => {
					switch (input.type) {
						case MessageType.TEXT:
							return input.text;
						case MessageType.ACTION:
							return `*(${input.text})*`;
						default:
							return '';
					}
				})
				.join(' ');

			console.log('sending message:', message);
			sendChatMessage(chatId, TEMP_USERNAME, message);
			const tempId = uuid();
			const tempMessage: ChatHistoryItem = {
				chat_message_id: tempId,
				chat_role: ChatRole.USER,
				chat_message: message,
				created_at: new Date().toISOString(),
			};
			dispatch(addChatHistory(tempMessage));
			dispatch(clear());
		} catch (error) {
			console.error(error);
		}
	};

	const renderChatInputs = () => {
		let reversedInputs = [...inputs].reverse();
		return reversedInputs.map((_input, idx) => {
			return <ChatInput key={idx} idx={idx} />;
		});
	};
	return (
		<View style={$rootContainer}>
			<InputToolbar />
			<View style={$container}>
				<View
					style={[
						$inputContainer,
						{
							height: inputCount === 1 ? 48 : inputCount * 58,
						},
					]}
				>
					{renderChatInputs()}
				</View>
				<View>
					<Pressable
						onPress={handleSend}
						style={$sendButton}
						disabled={!readyToSend}
					>
						<SendIcon fill={colors.white} />
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default ChatInputContainer;

const $rootContainer: ViewStyle = {
	display: 'flex',
	flexDirection: 'column',
	rowGap: spacing.xsm,
	backgroundColor: 'transparent',
};

const $container: ViewStyle = {
	flexDirection: 'row',
};

const $inputContainer: ViewStyle = {
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	rowGap: spacing.xsm,
};

const $sendButton: TextStyle = {
	display: 'flex',
	marginVertical: 0,
	alignSelf: 'center',
	alignItems: 'center',
	justifyContent: 'center',
	height: 46,
	width: 46,
	borderRadius: 50,
	marginRight: 0,
	backgroundColor: colors.mint[500],
};
