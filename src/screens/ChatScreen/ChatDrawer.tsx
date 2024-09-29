import SideDrawer from '@components/SideDrawer';
import DrawerSection from '@components/SideDrawer/DrawerSection';
import GoToLinkIcon from '@components/svgs/GoToLinkIcon';
import GridMenuIcon from '@components/svgs/GridMenuIcon';
import { Text } from '@components/Text';
import {
    resetChatHistoryState,
    selectChatRoomId,
    selectChatRoomName,
} from '@modules/chat-history/chat-history.slice';
import { removeChat } from '@modules/chats/chats.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { spacing } from 'src/theme/spacing';
import { deleteChats } from 'src/ws/chats.ws';

const ChatDrawer = () => {
    const [open, setOpen] = React.useState(false);
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const chatRoomName = useSelector(selectChatRoomName);
    const chatId = useSelector(selectChatRoomId);
    const dispatch = useDispatch();

    const handleDeleteChat = () => {
        navigation.navigate('UserChatsScreen');
        deleteChats([chatId]);
        dispatch(resetChatHistoryState());
        dispatch(removeChat(chatId));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Pressable onPress={handleOpen} style={$button}>
                <GridMenuIcon fill={colors.gray[200]} />
            </Pressable>
            <SideDrawer
                visible={open}
                onClose={handleClose}
                side="right"
                drawerWidth={280}
                overlayOpacity={0.5}
                animationDuration={300}
                drawerStyle={$rootContainer}>
                <View style={$profileContainer}>
                    <LinearGradient
                        colors={['#A0FADA', '#A0FADA']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ ...StyleSheet.absoluteFillObject }}
                    />
                    <Text weight="bold" size="lg" text={chatRoomName} />
                    <View
                        style={{
                            marginLeft: spacing.xxs,
                            marginBottom: -3,
                        }}>
                        <GoToLinkIcon fill={colors.mint[700]} />
                    </View>
                </View>
                <DrawerSection
                    title="채팅방"
                    items={[
                        {
                            label: '히스토리(퀘스트)',
                            onPress: () => {},
                        },
                        {
                            label: '일기장',
                            onPress: () => {},
                        },
                        {
                            label: '채팅방 설정',
                            onPress: () => {},
                        },
                    ]}
                    divider
                />
                <DrawerSection
                    title="버블(포인트)"
                    items={[
                        {
                            label: '적용된 버블 패스',
                            onPress: () => {},
                        },
                        {
                            label: '잔여 버블',
                            onPress: () => {},
                        },
                        {
                            label: '버블 구매하기',
                            onPress: () => {},
                        },
                    ]}
                    divider
                />
                <DrawerSection
                    title="기타"
                    items={[
                        {
                            label: '자동 TTS',
                            onPress: () => {},
                        },
                        {
                            label: '채팅방 삭제',
                            onPress: handleDeleteChat,
                        },
                    ]}
                />
            </SideDrawer>
        </>
    );
};

export default ChatDrawer;

const $rootContainer: ViewStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const $profileContainer: ViewStyle = {
    backgroundColor: colors.mint[100],
    height: 118,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: spacing.md,
};

const $button: ViewStyle = {
    padding: 10,
};
