import { AxiosRequestConfig } from 'axios';
import { Method, Result } from '../types/api';
import { getStandardHeaders, request } from './api.helper';

class TransactionsHelper {
    static async create(from: string, to: string, amount: number) {
        const body: TransactionRequestBody = {
            from: from,
            to: to,
            amount: amount,
        };

        const config: AxiosRequestConfig = {
            url: '/transactions',
            method: Method.POST,
            data: body,
            headers: getStandardHeaders(),
        };

        const result: Result<TransactionResponseBody> = await request(config);

        return result;
    }

    static async getOne(id: string) {
        const params = new URLSearchParams([['id', id]]);

        const config: AxiosRequestConfig = {
            url: '/transactions',
            params: params,
            method: Method.GET,
            headers: getStandardHeaders(),
        };

        const result: Result<TransactionResponseBody> = await request(config);

        return result;
    }

    static async getAll() {
        const config: AxiosRequestConfig = {
            url: '/transactions',
            method: Method.GET,
            headers: getStandardHeaders(),
        };

        const result: Result<TransactionResponseBody[]> = await request(config);

        return result;
    }
}

export default TransactionsHelper;