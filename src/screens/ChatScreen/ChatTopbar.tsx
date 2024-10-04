import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { AppStackParamList } from '@navigator/AppNavigator';
import BackIcon from '@components/svgs/BackIcon';
import ChatDrawer from './ChatDrawer';
import ChatModeButton from './ChatModeButton';
import { useChatModeSlice } from '@modules/chat-mode/chat-mode.slice';

const ChatTopbar = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();
	const { mode, dispatch, openChatMode } = useChatModeSlice();

	const handleBack = () => {
		navigation.goBack();
	};

	const handleOpenChatMode = () => {
		dispatch(openChatMode());
	};

	return (
		<View style={$topbar}>
			<Pressable onPress={handleBack} style={$button}>
				<BackIcon fill={colors.gray[200]} />
			</Pressable>
			<ChatModeButton onPress={handleOpenChatMode} mode={mode} />
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
