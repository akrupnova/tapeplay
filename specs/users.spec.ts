import UsersHelper from '../helpers/users.helper';
import { Result } from '../types/api';
import { expect } from 'chai';

describe('Users', function() {
    describe('creation request', function() {
        let userCreationResult: Result<UserResponseBody>;

        before(async function() {
            userCreationResult = await UsersHelper.create();
        });

        it('responses with status code 200', function() {
            expect(userCreationResult.response.status).to.eq(200);
        });

        it('contains user id in response body', function() {
            expect(userCreationResult.response.data.id).not.to.be.undefined;
        });

        it('contains initial amount in response body', function() {
            expect(userCreationResult.response.data.amount).not.to.be.undefined;
        });
    });

    describe('request to get user by id', function() {
        let getUserResult: Result<UserResponseBody>;
        let id: string;

        before(async function() {
            const userCreationResult = await UsersHelper.create();
            id = userCreationResult.response.data.id;
            getUserResult = await UsersHelper.getOne(id);
        });

        it('responses with status code 200', function() {
            expect(getUserResult.response.status).to.eq(200);
        });

        it('contains user id from request uri params in response body', function() {
            expect(getUserResult.response.data.id).to.eq(id);
        });

        it('contains initial amount in response body', function() {
            expect(getUserResult.response.data.amount).not.to.be.undefined;
        });
    });

    describe('request to get all users', function() {
        let getUsersResult: Result<UserResponseBody[]>;

        before(async function() {
            for (let i = 0; i < 3; i++) {
                await UsersHelper.create();
            }
            
            getUsersResult = await UsersHelper.getAll();
        });

        it('responses with status code 200', function() {
            expect(getUsersResult.response.status).to.eq(200);
        });

        it('user entries contains user id and amount in response body', function() {
            for (const entry of getUsersResult.response.data) {
                expect(entry.id).not.to.be.undefined;
                expect(entry.id).to.be.a('string');
                expect(entry.amount).not.to.be.undefined;
                expect(entry.amount).to.be.a('number');
            }
        });
    });

    describe('user deletion request', function() {
        let userDeletionResult: Result<MessageResponseBody>;

        before(async function() {
            const userCreationResult = await UsersHelper.create();
            userDeletionResult = await UsersHelper.delete(userCreationResult.response.data.id);
        });

        it('responses with status code 200', function() {
            expect(userDeletionResult.response.status).to.eq(200);
        });

        it('contains success message in response body', function() {
            expect(userDeletionResult.response.data.message).to.eq('User deleted.');
        });
    });
});