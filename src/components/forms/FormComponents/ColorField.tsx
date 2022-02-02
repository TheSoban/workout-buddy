import { FieldHookConfig, useField } from "formik";

type FieldProps = FieldHookConfig<string> & {label: string}

const ColorField = ({label, ...props}: FieldProps) => {
  const [field, meta] = useField(props);
  
   return (
         meta.touched
          ? <label htmlFor={field.name}>
              {label}
              <input placeholder={label} {...field} type="color" aria-invalid={!!(meta.touched && meta.error)} />
            </label>
          : <label htmlFor={field.name}>
              {label}
              <input placeholder={label} {...field} type="color" />
            </label>
   );
}

export default ColorField;