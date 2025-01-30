import { ReactNode } from "react"

export interface INavItemProps {
    to: string,
    content: ReactNode,
    className?: string,
    name?: string
}