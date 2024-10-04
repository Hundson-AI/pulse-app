import React, { useEffect, useLayoutEffect } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { Screen } from '@components/Screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import { AppStackParamList } from '@navigator/AppNavigator';

import { getChatList } from 'src/ws/chats.ws';

import Topbar from '@components/Topbar/Topbar';
import { Text } from '@components/Text';
import { useAuthSlice } from '@modules/auth/auth.slice';
import { useDataPersist } from '@hooks';

const SettingsScreen = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();
	const { user, signOut, dispatch } = useAuthSlice();
	const { removeAllPersistData } = useDataPersist();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => <Topbar />,
		});
	}, []);

	useEffect(() => {
		const initializeChats = () => {
			getChatList();
		};

		initializeChats();
	}, []);

	const handleSignOut = () => {
		dispatch(signOut());
		removeAllPersistData();
		// navigation.navigate('AuthHomeScreen');
	};

	return (
		<Screen
			preset='fixed'
			safeAreaEdges={['bottom']}
			contentContainerStyle={$rootContainer}
		>
			<View style={$settingContainer}>
				<Text text='로그인 정보' weight='medium' size='lg' />
				<Text
					text={`ID ${user?.username}`}
					weight='medium'
					size='xxs'
				/>
			</View>
			<Pressable style={$settingContainer} onPress={handleSignOut}>
				<Text text='로그아웃' weight='medium' size='lg' />
			</Pressable>
		</Screen>
	);
};

export default SettingsScreen;

const $rootContainer: ViewStyle = {
	flex: 1,
	backgroundColor: colors.background.light,
	justifyContent: 'flex-start',
	alignItems: 'center',
	paddingHorizontal: spacing.lg,
};

const $settingContainer: ViewStyle = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	borderBottomWidth: 1,
	paddingVertical: spacing.md,
};
