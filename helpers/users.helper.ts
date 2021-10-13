import { AxiosRequestConfig } from 'axios';
import { Method, Result } from '../types/api';
import { getStandardHeaders, request } from './api.helper';

class UsersHelper {
    static async create() {
        const config: AxiosRequestConfig = {
            url: '/users',
            method: Method.POST,
            headers: getStandardHeaders(),
        };

        const result: Result<UserResponseBody> = await request(config);

        return result;
    }

    static async getOne(id: string) {
        const params = new URLSearchParams([['id', id]]);

        const config: AxiosRequestConfig = {
            url: '/users',
            params: params,
            method: Method.GET,
            headers: getStandardHeaders(),
        };

        const result: Result<UserResponseBody> = await request(config);

        return result;
    }

    static async getAll() {
        const config: AxiosRequestConfig = {
            url: '/users',
            method: Method.GET,
            headers: getStandardHeaders(),
        };

        const result: Result<UserResponseBody[]> = await request(config);

        return result;
    }

    static async delete(id: string) {
        const body: DeletionRequestBody = {
            id: id,
        };

        const config: AxiosRequestConfig = {
            url: '/users',
            method: Method.DELETE,
            data: body,
            headers: getStandardHeaders(),
        };

        const result: Result<MessageResponseBody> = await request(config);

        return result;
    }
}

export default UsersHelper;