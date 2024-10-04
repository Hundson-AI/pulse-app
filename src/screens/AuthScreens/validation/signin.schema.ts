import { z } from 'zod';

export const signInSchema = z.object({
	username: z.string().min(0, '이메일을 입력해주세요.'),
	// .email('유효한 이메일 주소를 입력해주세요.'),
	password: z.string().min(6, '비밀번호는 최소 8자 이상이어야 합니다.'),
	// .regex(
	// 	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
	// 	'비밀번호는 영문자와 숫자를 포함해야 합니다.'
	// ),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const findPasswordSchema = z.object({
	username: z.string().min(0, '이메일을 입력해주세요.'),
	// .email('유효한 이메일 주소를 입력해주세요.'),
});

export type FindPasswordSchema = z.infer<typeof findPasswordSchema>;

export const verifyCodeSchema = z.object({
	code: z
		.string()
		.min(6, '인증번호는 6자리입니다.')
		.max(6, '인증번호는 6자리입니다.'),
});

export type VerifyCodeSchema = z.infer<typeof verifyCodeSchema>;

export const resetPasswordSchema = z.object({
	password: z.string().min(6, '비밀번호는 최소 8자 이상이어야 합니다.'),
	// .regex(
	// 	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
	// 	'비밀번호는 영문자와 숫자를 포함해야 합니다.'
	// ),
	confirmPassword: z
		.string()
		.min(6, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
