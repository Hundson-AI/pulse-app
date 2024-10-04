import React, { useLayoutEffect } from 'react';
import { ViewStyle, View, useWindowDimensions } from 'react-native';
import { Screen } from '@components/Screen';

import LongLogo from '@components/svgs/LongLogo';
import Divider from '@components/Divider';
import ToEmailSignIn from '../components/ToEmailSignIn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@navigator/AppNavigator';
import AuthTopbar from '../AuthTopbar';

export const AuthHomeScreen = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => <AuthTopbar toHelp />,
		});
	}, []);

	return (
		<Screen
			preset='scroll'
			safeAreaEdges={['top', 'bottom']}
			contentContainerStyle={[$rootContainer]}
		>
			<View style={$logoContainer}>
				<LongLogo />
			</View>
			<Divider text='로그인' />
			<View style={$buttonContainer}>
				<ToEmailSignIn />
			</View>
			<View />
		</Screen>
	);
};

const $rootContainer: ViewStyle = {
	flex: 1,
	paddingHorizontal: 40,
	justifyContent: 'flex-end',
};

const $logoContainer: ViewStyle = {
	flexGrow: 2,
	justifyContent: 'flex-end',
	alignItems: 'center',
};

const $buttonContainer: ViewStyle = {
	flexGrow: 1,
	justifyContent: 'flex-start',
	alignItems: 'center',
};
