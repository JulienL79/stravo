export interface IInputProps {
    id: string,
    className?: string,
    value?: string | number,
    type: string,
    placeholder: string,
    required?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}