import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import Close from '@assets/svgs/close.svg';
import BackIcon from '@components/svgs/BackIcon';

interface TopbarProps {
	type?: 'default' | 'close' | 'market' | 'back';
	onClose?: () => void;
	onBack?: () => void;
}

const Topbar: FC<TopbarProps> = ({ type = 'default', onClose }) => {
	const navigation = useNavigation();

	const getTopbarStyle = () => {
		switch (type) {
			case 'close':
				return $TopbarSpaceBetween;
			default:
				return $TopbarCenter;
		}
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[$Topbar, getTopbarStyle()]}>
			{type === 'back' && (
				<Pressable
					onPress={handleBack}
					style={{
						position: 'absolute',
						left: 0,
						bottom: 0,
						padding: 10,
					}}
				>
					<BackIcon fill={colors.gray[200]} />
				</Pressable>
			)}
			<Text style={$Logo}>PULSE</Text>
			{type === 'close' && (
				<Pressable onPress={onClose} style={{ padding: 10 }}>
					<Close />
				</Pressable>
			)}
		</View>
	);
};

export default Topbar;

const $Logo: TextStyle = {
	fontSize: 36,
	color: colors.mint[500],
	fontFamily: 'logo',
};

const $Topbar: ViewStyle = {
	height: 78,
	paddingHorizontal: 16,
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-end',
	width: '100%',
	backgroundColor: colors.background.light,
};

const $TopbarCenter: ViewStyle = {
	justifyContent: 'center',
};

const $TopbarSpaceBetween: ViewStyle = {
	justifyContent: 'space-between',
};
