import { ReactNode } from "react";

export interface ITextboxProps {
    title?: string;
    errors?: any;
    updateErrors?: any;
    isRequired?: boolean;
    form?: any;
    field?: string;
    children?: any;
    style?: any;
    placeholder?: string;
    placeholderColor?: string;
    updateForm?: any;
    isPassword?: boolean;
    multiline?: boolean;
    hasError?: any;
    iconOptions?: { icon: string, size: number, color: string };
    inputOptions?: { style: any };
}

export const textboxDefaultValues: ITextboxProps = {
    title: '',
    errors: {},
    updateErrors: null,
    isRequired: false,
    form: {},
    field: '',
    children: null,
    style: {},
    placeholder: '',
    placeholderColor: '',
    updateForm: null,
    isPassword: false,
    multiline: false,
    hasError: false,
    iconOptions: { icon: '', size: 20, color: '' },
    inputOptions: { style: null }
};