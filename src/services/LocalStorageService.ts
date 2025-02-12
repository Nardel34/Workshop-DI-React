import {ILocalStorageService} from "@interfaces/services";

export class LocalStorageService implements ILocalStorageService {
    private listeners: {key: string, handler: (value: unknown) => void}[] = [];

    GetValue<T>(key: string): T | undefined {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) return undefined;
        try {
            return JSON.parse(storedValue);
        } catch (error) {
            return storedValue as T;
        }
    }

    SetValue<T>(key: string, newValue: T): void {
        if (newValue) localStorage.setItem(key, JSON.stringify(newValue));
        this.NotifyListeners(key, newValue);
    }

    DeleteValue(key: string): void {
        localStorage.removeItem(key);
        this.NotifyListeners(key, null);
    }

    Subscribe(listener: {key: string, handler: (value: unknown) => void}): void {
        this.listeners.push(listener);
    }

    Unsubscribe(listener: {key: string, handler: (value: unknown) => void}): void {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    private NotifyListeners<T>(key: string, value: T): void {
        this.listeners.forEach(l => {
            if (l.key === key) l.handler(value);
        });
    }
}