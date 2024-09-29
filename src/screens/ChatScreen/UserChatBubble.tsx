import { TextStyle, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { spacing } from 'src/theme/spacing';
import { ChatHistoryItem } from '@modules/chat-history/chat-history.slice';
import { Text } from '@components/Text';
import { dateStringToDate, formatTime } from '@utils/dateUtils';
import { colors } from '@theme';

export interface UserChatBubbleProps {
    message: ChatHistoryItem;
    first?: boolean;
}

const UserChatBubble: FC<UserChatBubbleProps> = ({ message, first }) => {
    return (
        <View style={[$userContainer, { marginTop: first ? spacing.mlg : spacing.xxs }]}>
            <View style={$userBubble}>
                <Text text={message.chat_message} style={$message} />
            </View>
        </View>
    );
};

export default UserChatBubble;

const $userContainer: ViewStyle = {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: spacing.xxxl,
};

const $userBubble: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: colors.mint[100],
    borderRadius: spacing.mlg,
    padding: spacing.xs,
    paddingHorizontal: spacing.sm,
};

const $message: TextStyle = {
    alignSelf: 'flex-start',
    lineHeight: spacing.mlg,
    fontSize: spacing.smd,
    color: colors.gray[950],
};
