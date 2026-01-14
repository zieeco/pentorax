/**
 * Core application React Query hooks
 * Team, FAQs, Case Studies, Contact, Support
 * @module hooks/core
 */
import { type UseQueryOptions } from '@tanstack/react-query';
interface TeamMember {
    id: string;
    name: string;
    role: string;
    department: string;
    bio?: string;
    image: string;
    email?: string;
    linkedin?: string;
    order: number;
    is_active: boolean;
}
interface FAQ {
    id: string;
    question: string;
    answer: string;
    category?: string;
    order?: number;
}
interface CaseStudy {
    id: string;
    title: string;
    client: string;
    description: string;
    challenge?: string;
    solution?: string;
    results?: string;
    image?: string;
}
interface ContactData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}
interface TicketData {
    subject: string;
    category: string;
    description: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
}
/**
 * Fetch team members
 */
export declare function useTeam(options?: Omit<UseQueryOptions<TeamMember[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<TeamMember[], Error>;
/**
 * Fetch FAQs with optional filters
 */
export declare function useFAQs(params?: {
    category?: string;
    search?: string;
}, options?: Omit<UseQueryOptions<FAQ[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<FAQ[], Error>;
/**
 * Fetch case studies
 */
export declare function useCaseStudies(options?: Omit<UseQueryOptions<CaseStudy[]>, 'queryKey' | 'queryFn'>): import("@tanstack/react-query").UseQueryResult<CaseStudy[], Error>;
/**
 * Submit contact form
 */
export declare function useSubmitContact(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, ContactData, unknown>;
/**
 * Submit support ticket
 */
export declare function useSubmitTicket(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, TicketData, unknown>;
/**
 * Check warranty status
 */
export declare function useCheckWarranty(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string, unknown>;
/**
 * Subscribe to newsletter
 */
export declare function useSubscribeNewsletter(): import("@tanstack/react-query").UseMutationResult<import("axios").AxiosResponse<any, any>, Error, string, unknown>;
export {};
