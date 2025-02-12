import {ButtonHTMLAttributes, FC, ReactNode} from "react";
import "./Button.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    readonly children?: ReactNode;
    readonly className?: string;
    readonly background?: "warning" | "primary";
    readonly type?: string;
    readonly isLoading?: boolean;
}

export const Button: FC<Props> = ({children, className, background, type, ...props}) => {
    return (
        <button
            {...props}
            type={type || "button"}
            className={`button ${className || ""} ${background || "primary"}`}>
            {children}
        </button>
    );
};