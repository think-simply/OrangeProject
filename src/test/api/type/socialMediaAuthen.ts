export interface RequestBody {
    [key: string]: string;  // Index signature for dynamic keys
}
export interface StorageState {
    cookies: {
        name: string;
        value: string;
        domain: string;
        path: string;
    }[];
    origins: any[];
}