export interface User {
    name: string;
    email: string;
    password: string;
    tokens: string[];

    generateToken(): string;
};

export interface UserPublic {
    name: string;
    email: string;
};
