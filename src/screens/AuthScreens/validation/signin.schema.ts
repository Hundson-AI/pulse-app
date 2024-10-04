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
