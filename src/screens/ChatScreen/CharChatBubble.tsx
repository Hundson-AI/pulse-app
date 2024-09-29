import { TextStyle, View, ViewStyle, TouchableOpacity, Pressable } from 'react-native';
import React, { FC } from 'react';
import {
    ChatHistoryItem,
    selectChatRoomImage,
    selectChatRoomName,
} from '@modules/chat-history/chat-history.slice';
import { Text } from '@components/Text';
import Image from '@components/Image';
import { spacing } from 'src/theme/spacing';
import { colors } from '@theme';
import { useSelector } from 'react-redux';
import { ImageStyle } from 'expo-image';
import PlayIcon from '@components/svgs/PlayIcon';

export interface AssistantChatBubbleProps {
    message: ChatHistoryItem;
    first?: boolean;
}

const CharChatBubble: FC<AssistantChatBubbleProps> = ({ message, first }) => {
    const chatRoomName = useSelector(selectChatRoomName);
    const chatRoomImage = useSelector(selectChatRoomImage);

    return (
        <View style={[$chatterContainer, { marginTop: first ? spacing.mlg : -10 }]}>
            <Image
                source={{ uri: `https://pulsevoice.hudson-ai.com/pulse${chatRoomImage}` }}
                style={[
                    $image,
                    {
                        opacity: first ? 1 : 0,
                    },
                ]}
                alt="profile"
            />
            <View style={{ marginLeft: 3, flex: 1, marginRight: -14 }}>
                <Text
                    text={chatRoomName}
                    weight="semiBold"
                    size="xxs"
                    style={{
                        opacity: first ? 1 : 0,
                    }}
                />
                <TouchableOpacity activeOpacity={0.7} style={$touchable}>
                    <View style={$chatterBubble}>
                        <Text text={message.chat_message} style={$message} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                }}>
                <Pressable>
                    <PlayIcon fill={colors.mint[500]} />
                </Pressable>
            </View>
        </View>
    );
};

export default CharChatBubble;

const $chatterContainer: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: spacing.xs,
};

const $touchable: ViewStyle = {
    marginRight: spacing.md,
    backgroundColor: colors.white,
    borderRadius: spacing.mlg,
};

const $message: TextStyle = {
    alignSelf: 'flex-start',
    lineHeight: spacing.mlg,
    fontSize: spacing.smd,
};

const $chatterBubble: ViewStyle = {
    flexDirection: 'row',
    padding: spacing.sm,
    paddingHorizontal: spacing.xsm,
};

const $image: ImageStyle = {
    width: 44,
    height: 44,
    borderRadius: 999,
    marginRight: 6,
};
