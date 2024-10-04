import EmailIcon from '@components/svgs/EmailIcon';
import { Text } from '@components/Text';
import { AppStackParamList } from '@navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';

const ToEmailSignIn = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	const handleToEmailSignIn = () => {
		navigation.navigate('EmailSignInScreen');
	};

	return (
		<Pressable style={$button} onPress={handleToEmailSignIn}>
			<EmailIcon />
			<Text
				text='이메일(으)로 계속하기'
				style={{ color: colors.white, marginLeft: spacing.mlg }}
				weight='semiBold'
				size='xs'
			/>
		</Pressable>
	);
};

export default ToEmailSignIn;

const $button: ViewStyle = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	height: 54,
	backgroundColor: colors.mint[500],
	borderRadius: 100,
	justifyContent: 'center',
	alignItems: 'center',
	paddingHorizontal: spacing.mlg,
};
