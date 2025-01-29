import { ReactNode } from "react";

export interface IButtonProps {
    className?: string,
    content: ReactNode,
    onClick: () => void
}