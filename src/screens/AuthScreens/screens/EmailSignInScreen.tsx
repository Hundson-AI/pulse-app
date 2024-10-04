import React, { FC, useLayoutEffect } from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';
import { Screen } from '@components/Screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@navigator/AppNavigator';
import AuthTopbar from '../AuthTopbar';
import { Text } from '@components/Text';
import EmailSignInForm from '../components/EmailSignInForm';
import { colors } from '@theme';
import { spacing } from 'src/theme/spacing';
import Divider from '@components/Divider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props
	extends NativeStackScreenProps<AppStackParamList, 'EmailSignInScreen'> {}

export const EmailSignInScreen: FC<Props> = ({ route }) => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();
	const params = route?.params;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => <AuthTopbar toHelp toStart />,
		});
	}, []);

	const handleToSignUp = () => {
		navigation.navigate('EmailSignUpScreen');
	};

	const handleToFindPassword = () => {
		navigation.navigate('FindPasswordScreen');
	};

	const renderHeaderText = () => {
		let text = '이메일로 로그인';
		if (params?.fromResetPassword) {
			text = '이제 로그인하실 수 있습니다!';
		}
		return text;
	};

	return (
		<Screen
			preset='scroll'
			safeAreaEdges={['top', 'bottom']}
			contentContainerStyle={[$rootContainer]}
		>
			<View style={{ flex: 2 }} />
			<View style={{ flex: 3, justifyContent: 'center' }}>
				<Text
					text={renderHeaderText()}
					size='xs'
					weight='bold'
					style={{
						color: colors.gray[200],
						textAlign: 'center',
						marginBottom: spacing.sm,
					}}
				/>
				<EmailSignInForm />
				<View style={[$bottomContainer, { marginTop: spacing.sm }]}>
					<Text text='비밀번호를 잊어버리셨나요?' size='xs' />
					<Pressable style={$button} onPress={handleToFindPassword}>
						<Text
							text='비밀번호 찾기'
							size='sm'
							weight='bold'
							style={$buttonText}
						/>
					</Pressable>
				</View>
				<Divider />
				<View style={$bottomContainer}>
					<Text text='아직 계정이 없으신가요?' size='xs' />
					<Pressable style={$button} onPress={handleToSignUp}>
						<Text
							text='회원가입'
							size='sm'
							weight='bold'
							style={$buttonText}
						/>
					</Pressable>
				</View>
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
