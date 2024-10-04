import React from 'react';
import { ViewStyle, View } from 'react-native';
import { spacing } from 'src/theme/spacing';
import { authApi } from 'src/services/auth.api';
import { useDispatch } from 'react-redux';
import { useAuthSlice } from '../../../modules/auth/auth.slice';
import { DataPersistKeys, useDataPersist } from '@hooks';
import AuthInput from './AuthInput';
import AuthSubmitButton from './AuthSubmitButton';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInSchema } from '../validation/signin.schema';

const EmailSignInForm = () => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const { signIn } = useAuthSlice();
	const dispatch = useDispatch();
	const { setPersistData } = useDataPersist();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		mode: 'onSubmit',
	});

	const handleSignIn = async (data: SignInSchema) => {
		const { username, password } = data;
		setLoading(true);
		try {
			const { access_token } = await authApi.signIn(username, password);
			dispatch(signIn({ token: access_token, user: { username } }));
			setPersistData(DataPersistKeys.TOKEN, access_token);
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
			<View style={$inputContainer}>
				<Controller
					control={control}
					name='password'
					render={({ field: { onChange, value } }) => (
						<AuthInput
							value={value}
							secureTextEntry
							onChangeText={onChange}
							placeholder='비밀번호'
							isPassword
							error={errors.password?.message}
						/>
					)}
				/>
			</View>
			<AuthSubmitButton
				disabled={loading}
				loading={loading}
				onPress={handleSubmit(handleSignIn)}
				title='로그인'
			/>
		</>
	);
};

export default EmailSignInForm;

const $inputContainer: ViewStyle = {
	marginBottom: spacing.xs,
};
