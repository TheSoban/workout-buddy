import { FieldHookConfig, useField } from "formik";

type FieldProps = FieldHookConfig<string> & {label: string}

const TextField = ({label, type, ...props}: FieldProps) => {
  const [field, meta] = useField(props);
  
   return (
         meta.touched ? 
          <input placeholder={label} {...field} type={type} aria-invalid={!!(meta.touched && meta.error)} />
          :
          <input placeholder={label} {...field} type={type} />
   );
}

export default TextField;