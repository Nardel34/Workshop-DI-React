import {Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from 'react';
import {ServiceContext} from "@contexts/ServiceContext.tsx";

export function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T, R>(
    key: string,
    initialValue: T | (() => T),
    handler: (data: T) => R
): [R, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T, R = T>(
    key: string,
    initialValue: T | (() => T),
    handler?: (data: T) => R
): [T | R, Dispatch<SetStateAction<T>>] {

    const {localStorageService} = useContext(ServiceContext);
    const [storedValueState, setStoredValueState] = useState<T | R>(() => {
        const item = localStorageService.GetValue<T>(key);
        return item ? item : initialValue instanceof Function ? initialValue() : initialValue;
    });

    const setStoredValue: Dispatch<SetStateAction<T>> = useCallback(newValue => {
        try {
            if (newValue) localStorageService.SetValue<T>(key, newValue as T);
            else localStorageService.DeleteValue(key);
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, localStorageService]);

    const handleLocalStorageChange = useCallback((newValue: unknown) => {
        const handlerResult = handler?.(newValue as T);
        if (handlerResult) setStoredValueState(handlerResult as T | R);
        else setStoredValueState(newValue as T);
    }, [handler]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleLocalStorageChange(storedValueState), []);

    useEffect(() => {
        localStorageService.Subscribe({key: key, handler: handleLocalStorageChange});
        return () => localStorageService.Unsubscribe({key: key, handler: handleLocalStorageChange});
    }, [key, localStorageService, handleLocalStorageChange]);

    return [storedValueState, setStoredValue];
}