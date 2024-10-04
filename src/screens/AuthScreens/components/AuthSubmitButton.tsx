import Button, { ButtonProps } from '@components/Button';
import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { spacing } from 'src/theme/spacing';

interface Props extends ButtonProps {
	onPress: () => void;
	loading?: boolean;
}

const AuthSubmitButton: FC<Props> = ({ onPress, loading, ...props }) => {
	return (
		<Pressable
			style={[$button, props.disabled && $disabled]}
			onPress={onPress}
			{...props}
		>
			{loading && (
				<ActivityIndicator
					color={colors.white}
					size={16}
					style={{ marginRight: spacing.xs }}
				/>
			)}
			<Text
				text={props.title}
				style={{ color: colors.white }}
				weight='semiBold'
				size='xs'
			/>
		</Pressable>
	);
};

export default AuthSubmitButton;

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

const $disabled: ViewStyle = {
	backgroundColor: colors.gray[200],
};
