import { FieldHookConfig, useField } from "formik";

type FieldProps = FieldHookConfig<string> & {label: string, noValidate?: boolean}

const DateField = ({noValidate, label, ...props}: FieldProps) => {
  const [field, meta] = useField(props);
  
   return (
         !noValidate && meta.touched
         ? <label htmlFor={field.name}>
              {label}
              <input placeholder={label} {...field} type="date" aria-invalid={!!(meta.touched && meta.error)} />
            </label>
          : <label htmlFor={field.name}>
              {label}
              <input placeholder={label} {...field} type="date" />
            </label>
   );
}

export default DateField;