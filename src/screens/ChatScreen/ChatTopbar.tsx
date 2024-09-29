import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { Text } from '@components/Text';
import { AppStackParamList } from '@navigator/AppNavigator';
import { useSelector } from 'react-redux';
import { selectChatById } from '@modules/chats/chats.slice';
import { State } from '@modules/store';
import BackIcon from '@components/svgs/BackIcon';
import ChatDrawer from './ChatDrawer';

interface TopbarProps {
    chatId: string;
}

const ChatTopbar: FC<TopbarProps> = ({ chatId }) => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const chat = useSelector((state: State) => selectChatById(state, chatId));

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={$topbar}>
            <Pressable onPress={handleBack} style={$button}>
                <BackIcon fill={colors.gray[200]} />
            </Pressable>
            <Text text={chat?.chat_room_name} weight="bold" size="xs" />
            <ChatDrawer />
        </View>
    );
};

export default ChatTopbar;

const $topbar: ViewStyle = {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderBottomColor: colors.gray[100],
    borderBottomWidth: 1,
};

const $button: ViewStyle = {
    padding: 10,
};
