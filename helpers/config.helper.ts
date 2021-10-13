import { AxiosRequestConfig } from 'axios';
import { Method, Result } from '../types/api';
import { getStandardHeaders, request } from './api.helper';

class ConfigHelper {
    static async clear() {
        const config: AxiosRequestConfig = {
            url: '/config',
            method: Method.DELETE,
            headers: getStandardHeaders(),
        };

        const result: Result<MessageResponseBody> = await request(config);

        return result;
    }
}

export default ConfigHelper;