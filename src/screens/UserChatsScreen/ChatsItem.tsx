// ChatsItem.js
import Image from '@components/Image';
import { Text } from '@components/Text';
import { selectIsChatSelected, useChatListSlice } from '@modules/chat-list/chat-list.slice';
import { Chat } from '@modules/chats/chats.slice';
import { State } from '@modules/store';
import { AppStackParamList } from '@navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { renderFormattedDate } from '@utils/dateToKoreanDate';
import React, { FC } from 'react';
import { ImageStyle, Pressable, View, ViewStyle } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Config from 'src/config';
import { spacing } from 'src/theme/spacing';

interface Props {
    chat: Chat;
}

const ChatsItem: FC<Props> = ({ chat }) => {
    const { editMode, selectChatId, deselectChatId, dispatch } = useChatListSlice();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const isChatSelected = useSelector((state: State) =>
        selectIsChatSelected(state, chat.chat_room_id),
    );
    const handleToChat = () => {
        navigation.navigate('ChatScreen', { chatId: chat.chat_room_id });
    };

    const handleSelectChat = () => {
        if (isChatSelected) {
            dispatch(deselectChatId(chat.chat_room_id));
        } else {
            dispatch(selectChatId(chat.chat_room_id));
        }
    };

    return (
        <Pressable style={$container} onPress={handleToChat} disabled={editMode}>
            {editMode && (
                <View style={{ paddingRight: spacing.sm }}>
                    <RadioButton
                        value="editMode"
                        status={isChatSelected ? 'checked' : 'unchecked'}
                        color={colors.mint[500]}
                        uncheckedColor={colors.gray[200]}
                        onPress={handleSelectChat}
                    />
                </View>
            )}
            <Image
                source={{ uri: `https://pulsevoice.hudson-ai.com/pulse${chat.chat_thumb_img_src}` }}
                style={$image}
                alt="profile"
            />
            <View style={$textContainer}>
                <Text text={chat.chat_room_name} weight="semiBold" size="xs" />
                <Text
                    text={chat.chat_last_message}
                    weight="regular"
                    size="xs"
                    style={{ color: colors.gray[500] }}
                    numberOfLines={1}
                />
            </View>
            <View style={$rightContainer}>
                <Text
                    text={
                        chat.chat_last_message_time
                            ? renderFormattedDate(chat.chat_last_message_time)
                            : ''
                    }
                    weight="medium"
                    size="xxs"
                    style={{ color: colors.gray[300] }}
                />
                {chat.chat_none_response_count > 0 && (
                    <View style={$unreadCount}>
                        <Text
                            text={`${chat.chat_none_response_count}`}
                            weight="semiBold"
                            size="xxs"
                            style={{ color: colors.white }}
                        />
                    </View>
                )}
            </View>
        </Pressable>
    );
};

export default ChatsItem;

const $container: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 3,
};

const $image: ImageStyle = {
    width: 44,
    height: 44,
    borderRadius: 999,
    marginRight: 6,
};

const $textContainer: ViewStyle = {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
};

const $rightContainer: ViewStyle = {
    width: 50,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
};

const $unreadCount: ViewStyle = {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
};
