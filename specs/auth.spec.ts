import AuthHelper from '../helpers/auth.helper';
import { Result } from '../types/api';
import { expect } from 'chai';

describe('Auth', function() {
    describe('request with valid credentials', function() {
        let authResult: Result<AuthResponseBody>;

        before(async function() {
            authResult = await AuthHelper.post(process.env.LOGIN!, process.env.PASSWORD!);
        });

        it('responses with status code 200', function() {
            expect(authResult.response.status).to.eq(200);
        });

        it('contains token in response body', function() {
            expect(authResult.response.data.token).not.to.be.undefined;
        });
    });

    describe('request with invalid credentials', function() {
        let authResult: Result<AuthResponseBody>;

        before(async function() {
            authResult = await AuthHelper.post('invalid', 'invalid');
        });

        it('responses with status code 404', function() {
            expect(authResult.error.response?.status).to.eq(404);
        });

        it('contains error message in response body', function() {
            expect(authResult.error.response?.data.message).not.to.be.undefined;
        });
    });
});