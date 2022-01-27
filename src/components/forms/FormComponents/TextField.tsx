import { FieldHookConfig, useField } from "formik";

type FieldProps = FieldHookConfig<string> & {label?: string, noValidate?: boolean}

const TextField = ({noValidate, label, type, ...props}: FieldProps) => {
  const [field, meta] = useField(props);
  
   return (
         !noValidate && meta.touched
          ? <label htmlFor={field.name}>
              {label}
              <input style={{marginBottom: '0'}} {...field} type={type} aria-invalid={!!(meta.touched && meta.error)} />
            </label>
          : <label htmlFor={field.name}>
              {label}
              <input style={{marginBottom: '0'}} {...field} type={type} />
            </label>
   );
}

export default TextField;