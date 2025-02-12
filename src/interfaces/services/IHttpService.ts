export interface IHttpService {
    GetAsync<TResponse>(url: string, signal?: AbortSignal): Promise<TResponse | undefined>;

    PostAsync<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse | undefined>;

    PatchAsync<TBody, TResponse>(url: string, body: TBody): Promise<TResponse | undefined>;

    DeleteAsync<TResponse>(url: string): Promise<TResponse | undefined>;
}