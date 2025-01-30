import React from "react";
import { IFormProps } from "./Form.props";
import { FormField } from "@common-molecules/FormField";
import { Button } from "@common-atoms/Button";
import { useState } from "react";
import "./Form.css"

export const Form: React.FC<IFormProps> = ({ fields, onSubmit, buttonContent }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);  // Passe les données à la fonction onSubmit
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            {fields.map((field) => (
                <FormField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    value={formData[field.id] || ""}
                />
            ))}
            <Button content={buttonContent}/>
        </form>
    );

}