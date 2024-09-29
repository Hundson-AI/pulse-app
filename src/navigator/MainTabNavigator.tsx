import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { colors } from '@theme';

import UserCharactersScreen from 'src/screens/UserCharactersScreen';
import UserChatsScreen from 'src/screens/UserChatsScreen';
import CharacterIcon from '@components/svgs/CharacterIcon';
import ChatIcon from '@components/svgs/ChatIcon';
import useAuthorizedListeners from 'src/hooks/useAuthorizedListeners';
import { useSelector } from 'react-redux';
import { selectHasUnreadChats } from '@modules/chats/chats.slice';
import ChatUnreadIcon from '@components/svgs/ChatUnreadIcon';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const hasUnreadMessages = useSelector(selectHasUnreadChats);
    useAuthorizedListeners();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.mint[500],
                tabBarInactiveTintColor: colors.gray[200],
                tabBarStyle: styles.tabBarStyle,
            }}>
            <Tab.Screen
                name="UserCharactersScreen"
                component={UserCharactersScreen}
                options={{
                    tabBarLabel: '캐릭터',
                    tabBarIcon: ({ color, size }) => (
                        <CharacterIcon width={size} height={size} fill={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserChatsScreen"
                component={UserChatsScreen}
                options={{
                    tabBarLabel: '채팅',
                    tabBarIcon: ({ color, size }) =>
                        hasUnreadMessages ? (
                            <View>
                                <View
                                    style={{
                                        height: 10,
                                        width: 10,
                                        backgroundColor: colors.red,
                                        borderRadius: 999,
                                        position: 'absolute',
                                        top: 1,
                                        right: 0,
                                        zIndex: 1,
                                    }}
                                />
                                <ChatIcon width={size} height={size} fill={color} />
                            </View>
                        ) : (
                            <ChatIcon width={size} height={size} fill={color} />
                        ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: colors.gray[100],
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        height: 60,
        paddingBottom: 10,
    },
});

export default MainTabNavigator;
