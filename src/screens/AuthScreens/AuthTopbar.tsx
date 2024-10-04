import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { Text } from '@components/Text';
import { AppStackParamList } from '@navigator/AppNavigator';
import HelpIcon from '@components/svgs/HelpIcon';
import StartBarIcon from '@components/svgs/StartBarIcon';

interface Props {
	toHelp?: boolean;
	toStart?: boolean;
}

const AuthTopbar: FC<Props> = ({ toHelp, toStart }) => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	const handleToHome = () => {
		navigation.navigate('AuthHomeScreen');
	};

	const handleToHelp = () => {
		console.log('help');
	};

	return (
		<View style={$topbar}>
			<View>
				{toStart && (
					<Pressable onPress={handleToHome} style={$button}>
						<StartBarIcon fill={colors.gray[200]} />
						<Text
							text='처음으로'
							style={{ color: colors.gray[200] }}
							weight='medium'
							size='xxs'
						/>
					</Pressable>
				)}
			</View>
			<View>
				{toHelp && (
					<Pressable onPress={handleToHelp} style={$button}>
						<HelpIcon />
						<Text
							text='문의'
							style={{ color: colors.mint[500] }}
							weight='medium'
							size='xxs'
						/>
					</Pressable>
				)}
			</View>
		</View>
	);
};

export default AuthTopbar;

const $topbar: ViewStyle = {
	paddingHorizontal: 16,
	paddingTop: 30,
	paddingBottom: 10,
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	width: '100%',
	justifyContent: 'space-between',
	backgroundColor: colors.background.light,
};

const $button: ViewStyle = {
	padding: 10,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};
