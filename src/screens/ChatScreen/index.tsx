import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    ScrollView,
    View,
    ViewStyle,
} from 'react-native';
import { Screen } from '@components/Screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import { AppStackParamList } from '@navigator/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import ChatTopbar from './ChatTopbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    ChatRole,
    resetChatHistoryState,
    selectChatInitialized,
    selectLastChatMessage,
    selectOldestChatMessage,
} from '@modules/chat-history/chat-history.slice';
import { Text } from '@components/Text';
import {
    fetchChatDetails,
    fetchChatHistory,
    markMessagesRead,
    paginateChatHistory,
    registerChatListeners,
    unregisterChatListeners,
} from 'src/ws/chats.ws';
import ChatBubblesRenderer from './ChatBubblesRenderer';
import { LinearGradient } from 'expo-linear-gradient';
import ChatInputContainer from './ChatInputContainer';
import TypingBubble from './TypingBubble';
import { TEMP_USERNAME } from 'src/constants/temp';
import useAuthorizedListeners from 'src/hooks/useAuthorizedListeners';
import { markChatAsRead } from '@modules/chats/chats.slice';
import { ActivityIndicator } from 'react-native-paper';

const MESSAGES_PER_FETCH = 10;

interface Props extends NativeStackScreenProps<AppStackParamList, 'ChatScreen'> {}

const ChatScreen: FC<Props> = ({ route }) => {
    const [loadingMore, setLoadingMore] = useState(false);
    const [isNearBottom, setIsNearBottom] = useState(false);
    const [previousContentHeight, setPreviousContentHeight] = useState(0);
    const [previousScrollOffset, setPreviousScrollOffset] = useState(0);
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const dispatch = useDispatch();
    const initialized = useSelector(selectChatInitialized);
    const scrollViewRef = useRef<ScrollView>(null);
    const lastFetchRef = useRef<number | null>(null);
    const { chatId } = route.params;
    const isIos = Platform.OS === 'ios';
    const lastMessage = useSelector(selectLastChatMessage);
    const oldestMessage = useSelector(selectOldestChatMessage);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <ChatTopbar chatId={chatId} />,
        });
    }, []);

    useEffect(() => {}, [chatId]);

    useAuthorizedListeners();

    useEffect(() => {
        const initializeChat = () => {
            // fetch chat data
            fetchChatDetails(chatId);
            // fetch chat history
            fetchChatHistory(chatId, MESSAGES_PER_FETCH);
            // mark chat as read
            markMessagesRead(chatId, TEMP_USERNAME);

            dispatch(markChatAsRead(chatId));
        };

        initializeChat();

        return () => {
            dispatch(resetChatHistoryState());
        };
    }, []);

    const handleContentSizeChange = (_w: number, h: number) => {
        const newContentHeight = h;
        const heightDifference = newContentHeight - previousContentHeight;

        if (isNearBottom) {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        } else if (heightDifference > 0) {
            scrollViewRef.current?.scrollTo({
                y: previousScrollOffset + heightDifference,
                animated: false,
            });
        }

        setPreviousContentHeight(newContentHeight);
    };

    const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

        if (contentHeight - (yOffset + scrollViewHeight) <= 10) {
            setIsNearBottom(true);
        } else {
            setIsNearBottom(false);
        }

        if (yOffset <= 0 && !loadingMore) {
            const now = Date.now();
            // 5 seconds cooldown
            if (lastFetchRef.current && now - lastFetchRef.current < 1000) {
                return;
            }
            lastFetchRef.current = now;

            setLoadingMore(true);
            const oldContentHeight = contentHeight;
            setPreviousScrollOffset(yOffset);
            setPreviousContentHeight(oldContentHeight);
            paginateChatHistory(chatId, oldestMessage?.chat_message_id, MESSAGES_PER_FETCH);
            setLoadingMore(false);
        }
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['bottom']} contentContainerStyle={$rootContainer}>
            {initialized ? (
                <>
                    <ScrollView
                        style={$scrollContainer}
                        ref={scrollViewRef}
                        onContentSizeChange={handleContentSizeChange}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}>
                        {/* {loadingMore && <Text text="load more" />} */}
                        <ChatBubblesRenderer />
                        {lastMessage?.chat_role === ChatRole.USER && <TypingBubble />}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                    {isIos ? (
                        <KeyboardAvoidingView
                            behavior={isIos ? 'padding' : undefined}
                            keyboardVerticalOffset={-100}
                            style={$inputContainer}>
                            <LinearGradient
                                colors={['rgba(52, 52, 52, 0)', colors.red]}
                                start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 0.0, y: 1.0 }}>
                                <ChatInputContainer />
                            </LinearGradient>
                        </KeyboardAvoidingView>
                    ) : (
                        <>
                            <View style={$inputContainer}>
                                <ChatInputContainer />
                            </View>
                            {/* <KeyboardSpacer topSpacing={20} /> */}
                        </>
                    )}
                </>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color={colors.mint[500]} />
                </View>
            )}
        </Screen>
    );
};

export default ChatScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.light,
    justifyContent: 'space-between',
};

const $scrollContainer: ViewStyle = {
    flex: 1,
};

const $inputContainer: ViewStyle = {
    marginBottom: spacing.md,
    marginTop: -40,
};
