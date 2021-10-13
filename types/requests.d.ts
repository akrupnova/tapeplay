interface AuthRequestBody {
    login: string,
    password: string,
};

interface DeletionRequestBody {
    id: string,
};

interface TransactionRequestBody {
    from: string,
    to: string,
    amount: number,
};