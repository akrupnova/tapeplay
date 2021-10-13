interface AuthResponseBody {
    token: string,
};

interface MessageResponseBody {
    message: string,
};

interface UserResponseBody {
    id: string,
    amount: number,
};

interface TransactionResponseBody {
    id: string,
    from: string,
    to: string,
    amount: number,
};