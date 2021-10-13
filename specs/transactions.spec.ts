import TransactionsHelper from '../helpers/transactions.helper';
import UsersHelper from '../helpers/users.helper';
import { Result } from '../types/api';
import { getRandomItem } from '../helpers/common.helper';
import { expect } from 'chai';

describe('Transactions', function() {
    let firstUser: string;
    let secondUser: string;
    let transactionCreationResult: Result<TransactionResponseBody>;
    let transactionIdentifier: string;

    before(async function() {
        const firstUserCreationResult = await UsersHelper.create();
        firstUser = firstUserCreationResult.response.data.id;
        const secondUserCreationResult = await UsersHelper.create();
        secondUser = secondUserCreationResult.response.data.id;
        transactionCreationResult = await TransactionsHelper.create(firstUser, secondUser, 100);
        transactionIdentifier = transactionCreationResult.response.data.id;
    });

    describe('creation request', function() {
        it('responses with status code 200', function() {
            expect(transactionCreationResult.response.status).to.eq(200);
        });

        it('contains transaction details in response body', function() {
            const body = transactionCreationResult.response.data;
            expect(body.id).not.to.be.undefined;
            expect(body.id).to.be.a('string');
            expect(body.from).not.to.be.undefined;
            expect(body.from).to.be.a('string');
            expect(body.to).not.to.be.undefined;
            expect(body.to).to.be.a('string');
            expect(body.amount).not.to.be.undefined;
            expect(body.amount).to.be.a('number');
        });
    });

    describe('request to get a transaction by id', function() {
        let getTransactionResult: Result<TransactionResponseBody>;

        before(async function() {
            getTransactionResult = await TransactionsHelper.getOne(transactionIdentifier);
        });

        it('responses with status code 200', function() {
            expect(getTransactionResult.response.status).to.eq(200);
        });

        it('contains transaction details in response body', function() {
            const body = transactionCreationResult.response.data;
            expect(body.id).not.to.be.undefined;
            expect(body.id).to.be.a('string');
            expect(body.from).not.to.be.undefined;
            expect(body.from).to.be.a('string');
            expect(body.to).not.to.be.undefined;
            expect(body.to).to.be.a('string');
            expect(body.amount).not.to.be.undefined;
            expect(body.amount).to.be.a('number');
        });
    });

    describe('request to get all transactions', function() {
        let getTransactionsResult: Result<TransactionResponseBody[]>;

        before(async function() {
            for (let i = 0; i < 3; i++)
                await TransactionsHelper.create(firstUser, secondUser, 50);
            getTransactionsResult = await TransactionsHelper.getAll();
        });

        it('responses with status code 200', function() {
            expect(getTransactionsResult.response.status).to.eq(200);
        });

        it('contains transaction details in response body', function() {
            const body = getTransactionsResult.response.data;
            expect(body).to.be.an('array');
            const transaction: TransactionResponseBody = getRandomItem(body);
            expect(transaction.id).not.to.be.undefined;
            expect(transaction.id).to.be.a('string');
            expect(transaction.from).not.to.be.undefined;
            expect(transaction.from).to.be.a('string');
            expect(transaction.to).not.to.be.undefined;
            expect(transaction.to).to.be.a('string');
            expect(transaction.amount).not.to.be.undefined;
            expect(transaction.amount).to.be.a('number');
        });
    });
});