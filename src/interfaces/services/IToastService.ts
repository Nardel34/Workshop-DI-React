import {ReactNode} from "react";
import {UpdateOptions} from "react-toastify";

export interface IToastService {
    Success(content: ReactNode, timer?: number): void;

    Error(content: ReactNode, timer?: number): void;

    Warning(content: ReactNode, timer?: number): void;

    Info(content: ReactNode, timer?: number): void;

    Promise<T>(
        action: () => Promise<T>,
        messages: {
            pending: string | UpdateOptions<T>;
            success: string | UpdateOptions<T>;
            error: string | UpdateOptions<T>;
        },
        timer?: number
    ): Promise<T>
}
