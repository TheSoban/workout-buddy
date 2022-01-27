import { FieldHookConfig, useField } from "formik";

type FieldProps = FieldHookConfig<string> & {label: string, options: {value: string, label: string}[], noValidate?: boolean}

const SelectField = ({noValidate, options, label, type, ...props}: FieldProps) => {
  const [field, meta] = useField(props);
  
   return (
         !noValidate && meta.touched
          ? <label htmlFor={field.name}>
              {label}
              <select {...field} aria-invalid={!!(meta.touched && meta.error)}>
                {options.map(option => <option key={option.value} value={option.value} label={option.label} />)}
              </select>
            </label>
          : <label htmlFor={field.name}>
              {label}
              <select {...field}>
                {options.map(option => <option key={option.value} value={option.value} label={option.label} />)}
              </select>
            </label>
   );
}

export default SelectField;