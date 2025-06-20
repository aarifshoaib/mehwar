import * as yup from 'yup';
export const FormValidation = (err: yup.ValidationError) => {
    const mergedErrors: any = {};

    if (err instanceof yup.ValidationError) {
        // Option 1: Display the first error message
        const x = err.inner.map(item => {
            const { path, errors } = item;

            if (!mergedErrors[path]) {
                mergedErrors[path] = [];
            }
            mergedErrors[path].push(...errors);

        });
    }

    return mergedErrors;
}

export const ValidateField = (field, errors) => {
    const errs = FormValidation(errors);

    return errs[field] ? errs[field] : null;

}