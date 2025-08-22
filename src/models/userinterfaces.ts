export interface User {
    name: string;
    email: string;
    password: string;
    tokens: string[];

    generateToken(): string;
    publicInformation(): object;

    findByCredentials(credentials: object): Promise<User>;
};

export interface UserPublic {
    name: string;
    email: string;
};
