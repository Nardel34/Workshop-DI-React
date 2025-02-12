export interface ILocalStorageService {
    GetValue<T>(key: string): T | undefined;

    SetValue<T>(key: string, newValue: T): void;

    DeleteValue(key: string): void;

    Subscribe(listener: {key: string, handler: (value: unknown) => void}): void;

    Unsubscribe(listener: {key: string, handler: (value: unknown) => void}): void;
}