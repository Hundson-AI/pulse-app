import React, { FC, useLayoutEffect } from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';
import { Screen } from '@components/Screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@navigator/AppNavigator';
import AuthTopbar from '../AuthTopbar';
import { Text } from '@components/Text';
import EmailSignUpForm from '../components/EmailSignUpForm';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import Divider from '@components/Divider';

export const FindPasswordScreen = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => <AuthTopbar toHelp toBack />,
		});
	}, []);

	return (
		<Screen
			preset='scroll'
			safeAreaEdges={['top', 'bottom']}
			contentContainerStyle={[$rootContainer]}
		>
			<View style={{ flex: 2 }} />
			<View style={{ flex: 3, justifyContent: 'center' }}>
				<Text
					text='이메일로 회원가입'
					size='xs'
					weight='bold'
					style={{
						color: colors.gray[200],
						textAlign: 'center',
						marginBottom: spacing.sm,
					}}
				/>
				<EmailSignUpForm />
			</View>
		</Screen>
	);
};

const $rootContainer: ViewStyle = {
	flex: 1,
	paddingHorizontal: 40,
};

const $bottomContainer: ViewStyle = {
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
};

const $button: ViewStyle = {};

const $buttonText: TextStyle = {
	color: colors.mint[500],
	padding: spacing.xxs,
};
