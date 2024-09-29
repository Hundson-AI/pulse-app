import React, { useEffect, useLayoutEffect } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { Screen } from '@components/Screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import { AppStackParamList } from '@navigator/AppNavigator';
import { useSelector } from 'react-redux';
import UserChatsTopbar from './UserChatsTopbar';
import { selectAllChats, selectChatsInitialized } from '@modules/chats/chats.slice';
import ChatsItem from './ChatsItem';
import { getChatList } from 'src/ws/chats.ws';

import { ActivityIndicator } from 'react-native-paper';
import ChatFAB from './ChatFAB';
import { Text } from '@components/Text';

const UserChatsScreen = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const chats = useSelector(selectAllChats);
    const initialized = useSelector(selectChatsInitialized);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <UserChatsTopbar />,
        });
    }, []);

    useEffect(() => {
        const initializeChats = () => {
            getChatList();
        };

        initializeChats();
    }, []);

    const renderChats = () => {
        if (!chats || chats.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text text="채팅이 없습니다." />
                </View>
            );
        }
        return chats?.map(chat => {
            return <ChatsItem key={chat.chat_room_id} chat={chat} />;
        });
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['bottom']} contentContainerStyle={$rootContainer}>
            {!initialized ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={colors.mint[500]} />
                </View>
            ) : (
                <ScrollView style={$scrollContainer}>{renderChats()}</ScrollView>
            )}
            <ChatFAB />
        </Screen>
    );
};

export default UserChatsScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.light,
};

const $scrollContainer: ViewStyle = {
    paddingTop: 20,
};
