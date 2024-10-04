import React from 'react';
import { ViewStyle, View } from 'react-native';
import { spacing } from 'src/theme/spacing';
import AuthInput from './AuthInput';
import AuthSubmitButton from './AuthSubmitButton';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ResetPasswordSchema,
	resetPasswordSchema,
} from '../validation/signin.schema';
import { AppStackParamList } from '@navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const ResetPasswordForm = () => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onSubmit',
	});

	const handleResetPassword = async (data: ResetPasswordSchema) => {
		setLoading(true);
		try {
			//TODO: hook up sign up api

			await new Promise((resolve) => setTimeout(resolve, 1000));
			navigation.navigate('EmailSignInScreen', {
				fromResetPassword: true,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<View style={$inputContainer}>
				<Controller
					control={control}
					name='password'
					render={({ field: { onChange, value } }) => (
						<AuthInput
							value={value}
							onChangeText={onChange}
							placeholder='비밀번호'
							keyboardType='email-address'
							error={errors.password?.message}
						/>
					)}
				/>
			</View>
			<View style={$inputContainer}>
				<Controller
					control={control}
					name='confirmPassword'
					render={({ field: { onChange, value } }) => (
						<AuthInput
							value={value}
							secureTextEntry
							onChangeText={onChange}
							placeholder='비밀번호 확인'
							isPassword
							error={errors.confirmPassword?.message}
						/>
					)}
				/>
			</View>
			<AuthSubmitButton
				disabled={loading}
				loading={loading}
				onPress={handleSubmit(handleResetPassword)}
				title='변경하기'
			/>
		</>
	);
};

export default ResetPasswordForm;

const $inputContainer: ViewStyle = {
	marginBottom: spacing.xs,
};
