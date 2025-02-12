import {IHttpService, IToastService} from "@interfaces/services";

export class HttpService implements IHttpService {
    private readonly _toastService: IToastService;

    constructor(toastService: IToastService) {
        this._toastService = toastService;
    }

    async GetAsync<TResponse>(url: string, signal?: AbortSignal): Promise<TResponse | undefined> {
        const options: RequestInit = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
            ...(signal && {signal: signal})
        };
        options.signal = signal;
        return await this.Request<TResponse>(url, options);
    }

    async PostAsync<TBody, TResponse>(url: string, body: TBody): Promise<TResponse | undefined> {
        const options: RequestInit = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(body),
        };
        return await this.Request<TResponse>(url, options);
    }

    async PatchAsync<TBody, TResponse>(url: string, body: TBody): Promise<TResponse | undefined> {
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(body),
        };
        return await this.Request<TResponse>(url, options);
    }

    async DeleteAsync<TResponse>(url: string): Promise<TResponse | undefined> {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
        };
        return await this.Request<TResponse>(url, options);
    }

    private async Request<TResponse>(url: string, options: RequestInit): Promise<TResponse | undefined> {
        try {
            const resp = await fetch(url, options);
            const text = await resp.text();
            if (resp.ok && !text) return;
            const json = JSON.parse(text);
            if (resp.ok) return json as TResponse;
            this._toastService.Error("An unknown error occurred");
            return Promise.reject(new Error(`${resp.status} : ${json.message}`));
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === "AbortError") return Promise.reject("Request aborted");
                this._toastService.Error("An unknown error occurred");
            }
            throw err;
        }
    }
}
