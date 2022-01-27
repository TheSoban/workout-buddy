import { FieldHookConfig, useField } from "formik";

type FieldProps = FieldHookConfig<number>

const CheckboxField = ({...props}: FieldProps) => {
  const [field] = useField(props);
  return <input type="checkbox" {...field} />
}

export const CheckboxGroup = () => {
  
}

export default CheckboxField;