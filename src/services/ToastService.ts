import {IToastService} from "@interfaces/services";
import {Bounce, toast, ToastOptions, UpdateOptions} from "react-toastify";
import {ReactNode} from "react";

export class ToastService implements IToastService {
    Success(content: ReactNode, timer = 5000): void {
        toast.success(content, this.ToastOptions(timer));
    }

    Error(content: ReactNode, timer?: number): void {
        const options = this.ToastOptions(timer);
        options.closeOnClick = false;
        toast.error(content, options);
    }

    Warning(content: ReactNode, timer?: number): void {
        toast.warning(content, this.ToastOptions(timer));
    }

    Info(content: ReactNode, timer = 10000): void {
        toast.info(content, this.ToastOptions(timer));
    }

    Promise<T>(
        action: () => Promise<T>,
        messages: {
            pending: string | UpdateOptions<T>;
            success: string | UpdateOptions<T>;
            error: string | UpdateOptions<T>;
        },
        timer = 10000
    ): Promise<T> {
        return toast.promise(
            action(),
            {
                pending: messages.pending,
                success: messages.success,
                error: messages.error,
            },
            this.ToastOptions(timer)
        );
    }

    private ToastOptions(timer?: number): ToastOptions {
        return {
            position: "bottom-right",
            autoClose: timer ?? false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        };
    }
}
