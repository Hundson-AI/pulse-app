import React from 'react';
import { ViewStyle, View } from 'react-native';
import { spacing } from 'src/theme/spacing';
import AuthInput from './AuthInput';
import AuthSubmitButton from './AuthSubmitButton';
import { Controller, set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	findPasswordSchema,
	FindPasswordSchema,
	verifyCodeSchema,
	VerifyCodeSchema,
} from '../validation/signin.schema';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '@navigator/AppNavigator';

const FindPasswordForm = () => {
	const navigation = useNavigation<NavigationProp<AppStackParamList>>();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isCodeSent, setIsCodeSent] = React.useState<boolean>(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FindPasswordSchema>({
		resolver: zodResolver(findPasswordSchema),
		mode: 'onSubmit',
	});

	const {
		control: verifyControl,
		handleSubmit: verifyHandleSubmit,
		formState: { errors: verifyErrors, isValid: verifyIsValid },
	} = useForm<VerifyCodeSchema>({
		resolver: zodResolver(verifyCodeSchema),
		mode: 'onSubmit',
	});

	const handleRequestCode = async (data: FindPasswordSchema) => {
		const { username } = data;
		setLoading(true);
		try {
			//TODO: hook up sign up api

			await new Promise((resolve) => setTimeout(resolve, 1000));
			setIsCodeSent(true);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyCode = async (data: VerifyCodeSchema) => {
		const { code } = data;
		setLoading(true);
		try {
			//TODO: hook up verify code api

			await new Promise((resolve) => setTimeout(resolve, 1000));
			navigation.navigate('ResetPasswordScreen');
			setIsCodeSent(true);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{!isCodeSent && (
				<View style={$inputContainer}>
					<Controller
						control={control}
						name='username'
						render={({ field: { onChange, value } }) => (
							<AuthInput
								value={value}
								onChangeText={onChange}
								placeholder='이메일'
								keyboardType='email-address'
								error={errors.username?.message}
							/>
						)}
					/>
				</View>
			)}

			{isCodeSent && (
				<View style={$inputContainer}>
					<Controller
						control={verifyControl}
						name='code'
						render={({ field: { onChange, value } }) => (
							<AuthInput
								value={value}
								onChangeText={onChange}
								placeholder='인증코드'
								error={verifyErrors.code?.message}
							/>
						)}
					/>
				</View>
			)}

			<AuthSubmitButton
				disabled={loading}
				loading={loading}
				onPress={
					isCodeSent
						? verifyHandleSubmit(handleVerifyCode)
						: handleSubmit(handleRequestCode)
				}
				title={isCodeSent ? '인증하기' : '인증번호 받기'}
			/>
		</>
	);
};

export default FindPasswordForm;

const $inputContainer: ViewStyle = {
	marginBottom: spacing.xs,
};
