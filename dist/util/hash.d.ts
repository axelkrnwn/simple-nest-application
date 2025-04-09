export declare class Hasher {
    static saltOrRounds: number;
    static verify: (password: string, hashed: string) => Promise<boolean>;
    static hash: (password: string) => Promise<string>;
}
