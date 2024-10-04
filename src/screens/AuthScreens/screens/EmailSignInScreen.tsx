import React, { FC, useLayoutEffect } from 'react';
import { ViewStyle } from 'react-native';
import { Screen } from '@components/Screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@navigator/AppNavigator';
import AuthTopbar from '../AuthTopbar';
import { Text } from '@components/Text';
import EmailSignInForm from '../components/EmailSignInForm';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';

export const EmailSignInScreen = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => <AuthTopbar toHelp toStart />,
		});
	}, []);

	return (
		<Screen
			preset='scroll'
			safeAreaEdges={['top', 'bottom']}
			contentContainerStyle={[$rootContainer]}
		>
			<Text
				text='이메일로 로그인'
				size='xs'
				weight='bold'
				style={{
					color: colors.gray[200],
					textAlign: 'center',
					marginBottom: spacing.sm,
				}}
			/>
			<EmailSignInForm />
		</Screen>
	);
};

const $rootContainer: ViewStyle = {
	flex: 1,
	paddingHorizontal: 40,
	justifyContent: 'flex-end',
};
