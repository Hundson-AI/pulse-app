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
import SmileIcon from '@components/svgs/SmileIcon';
import ActionIcon from '@components/svgs/ActionIcon';
import InputToolbar, { MessageType } from './InputToolbar';
import { TEMP_USERNAME } from 'src/constants/temp';

const ChatInputContainer = () => {
    const chatId = useSelector(selectChatRoomId);
    const [type, setType] = useState<MessageType>(MessageType.TEXT);
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const textInputRef = useRef(null);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState<ChatHistoryItem[]>([]);
    const handleSend = async () => {
        try {
            if (text.length < 1) return;

            let message = text;
            if (type === MessageType.ACTION) {
                message = `*(${text})*`;
            }

            sendChatMessage(chatId, TEMP_USERNAME, message);

            const tempId = uuid();

            const tempMessage: ChatHistoryItem = {
                chat_message_id: tempId,
                chat_role: ChatRole.USER,
                chat_message: message,
                created_at: new Date().toISOString(),
            };

            dispatch(addChatHistory(tempMessage));

            setText('');
            setType(MessageType.TEXT);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={$rootContainer}>
            <InputToolbar currentType={type} setType={setType} isVisible={isFocused} />
            <View style={$container}>
                <View style={$inputContainer}>
                    <View style={$typeContainer}>
                        {type === MessageType.TEXT ? (
                            <SmileIcon fill={colors.gray[300]} />
                        ) : (
                            <ActionIcon fill={colors.gray[300]} />
                        )}
                    </View>
                    <TextField
                        ref={textInputRef}
                        containerStyle={$textfieldContainer}
                        inputWrapperStyle={$textfieldInputWrapper}
                        style={$textfield}
                        multiline={true}
                        onChangeText={text => setText(text)}
                        value={text}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </View>
                <View>
                    <Pressable onPress={handleSend} style={$sendButton} disabled={text.length < 1}>
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: 20,
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
