export interface User {
    name: string;
    email: string;
    password: string;
    tokens: string[];

    generateToken(): string;
    publicInformation(): object;
};

export interface UserPublic {
    name: string;
    email: string;
};
