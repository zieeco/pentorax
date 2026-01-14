interface QuoteData {
    name: string;
    email: string;
    phone: string;
    message: string;
    products?: string[];
}
/**
 * Submit quote request
 */
export declare function useCreateQuote(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, QuoteData, unknown>;
export {};
