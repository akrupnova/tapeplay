import { AxiosResponse, AxiosError } from 'axios';

export enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete'
}

export interface Result<Type> {
    response: AxiosResponse<Type>,
    error: AxiosError<MessageResponseBody>
};