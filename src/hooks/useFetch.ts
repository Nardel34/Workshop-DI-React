import {useContext, useEffect, useState} from 'react';
import {ServiceContext} from "@contexts/ServiceContext.tsx";

export type Result<T, R = T> = {
    readonly result?: R,
    readonly isLoading: boolean,
}

export function useFetch<T>(
    url: string,
): Result<T>;

export function useFetch<T, R>(
    url: string,
    handler: (data: T) => R
): Result<T, R>;

export function useFetch<T>(
    url: string,
    handler: (data: T) => T
): Result<T>;

export function useFetch<T, R = T>(
    url: string,
    handler?: (data: T) => R
): Result<T, R> {

    const {httpService} = useContext(ServiceContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<R>();

    useEffect(() => {
        if (!url) return;
        setIsLoading(true);
        const abortController = new AbortController();
        httpService.GetAsync<T>(url, abortController.signal)
            .then(resp => {
                if (!resp) return;
                const handlerResult = handler ? handler(resp) : resp;
                setResult(handlerResult as R);
                setIsLoading(false);
            });

        return () => abortController.abort();
    }, [url, handler, httpService]);

    return {result, isLoading};
}