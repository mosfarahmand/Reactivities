import React from "react";
import {useField} from "formik";
import {FormField, Label} from "semantic-ui-react";
import {InputText} from "primereact/inputtext";

interface Props{
    placeholder: string;
    name: string;
    type?: string;
    label?: string;
}

export default function MyTextInput(props: Props){
    const [field, meta] = useField(props.name);
    return(
        <FormField error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <InputText {...field} {...props} className="p-inputtext p-component"/>
            {meta.touched && meta.error ? (
                 <Label basic color='red'  >{meta.error}</Label>
            ): null}
        </FormField>
    )
}
