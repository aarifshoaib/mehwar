export interface IControlProps {
    title: string;
    errors: any;
    updateErrors: any;
    isRequired: boolean;
    form: any;
    field: string;
    children: any;
    style: any;


}

export class ControlProps implements IControlProps {
    title: string;
    errors: any;
    updateErrors: any;
    isRequired: boolean;
    form: any;
    field: string;
    children: any;
    style: any;
    constructor(props: IControlProps) {
        this.title = props.title;
        this.errors = props.errors;
        this.updateErrors = props.updateErrors;
        this.isRequired = props.isRequired;
        this.form = props.form;
        this.field = props.field;
        this.children = props.children;
        this.style = props.style;
    }
}