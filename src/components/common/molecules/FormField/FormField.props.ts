import { ReactNode } from "react"

export interface IFormFieldProps {
        label: ReactNode,
        id: string,
        value?: string | number,
        type: string,
        placeholder: string,
        required?: boolean,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        className?: string
}