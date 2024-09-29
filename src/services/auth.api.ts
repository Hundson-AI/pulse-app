import { Api } from './api';
import { Tag } from './tags.api';
import querystring from 'querystring';

export class AuthApi extends Api {
    async signIn(userId: string, password: string): Promise<{ access_token: string; user: any }> {
        try {
            const body = querystring.stringify({
                username: userId,
                password,
            });

            const response = await this.axiosInstance.post('/dev/token', body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            return {
                access_token: response.data.access_token,
                user: null,
            };
        } catch (error: any) {
            console.error(error.response.data.detail.forEach((e: any) => console.log(e)));
            throw error;
        }
    }
}

export const authApi = new AuthApi();
