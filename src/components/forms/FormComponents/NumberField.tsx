import { FieldHookConfig, useField } from "formik";

type FieldProps = FieldHookConfig<string> & {label: string, min: number, max: number, step: number, noValidate?: boolean}

const NumberField = ({noValidate, min, max, step, label, type, ...props}: FieldProps) => {
  const [field, meta] = useField(props);
  
   return (
         !noValidate && meta.touched
          ? <label htmlFor={field.name}>
              {label}
              <input min={min} max={max} step={step} placeholder={label} {...field} type="number" aria-invalid={!!(meta.touched && meta.error)} />
            </label>
          : <label htmlFor={field.name}>
              {label}
              <input  min={min} max={max} step={step} placeholder={label} {...field} type="number" />
            </label>
   );
}

export default NumberField;