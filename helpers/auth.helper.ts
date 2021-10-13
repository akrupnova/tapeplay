import { AxiosRequestConfig } from 'axios';
import { Method, Result } from '../types/api';
import { request } from './api.helper';

class AuthHelper {
    static async post(login: string, password: string) {
        const body: AuthRequestBody = {
            login: login,
            password: password,
        };

        const config: AxiosRequestConfig = {
            url: '/auth',
            method: Method.POST,
            data: body,
        };

        const result: Result<AuthResponseBody> = await request(config);

        return result;
    }
}

export default AuthHelper;