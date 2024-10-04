import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import {
	NativeSyntheticEvent,
	TextInput,
	TextInputChangeEventData,
	TextInputProps,
	TextStyle,
	ViewStyle,
} from 'react-native';
import { spacing } from 'src/theme/spacing';

interface Props extends TextInputProps {
	error?: string;
	isPassword?: boolean;
}

const AuthInput: FC<Props> = ({ isPassword, error, ...props }) => {
	return (
		<>
			<TextInput
				placeholderTextColor={colors.gray[200]}
				style={$input}
				secureTextEntry={isPassword}
				{...props}
			/>
			{error && (
				<Text weight='semiBold' size='xxxs' style={$errorText}>
					{error}
				</Text>
			)}
		</>
	);
};

export default AuthInput;

const $inputContainer: ViewStyle = {};

const $input: ViewStyle = {
	backgroundColor: colors.gray[100],
	paddingHorizontal: spacing.md,
	borderRadius: spacing.xxl,
	height: 54,
};

const $errorText: TextStyle = {
	color: colors.orange[600],
	marginTop: 4,
};
