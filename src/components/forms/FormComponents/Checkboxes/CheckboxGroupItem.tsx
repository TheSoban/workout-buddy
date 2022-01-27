import React from "react";
import { useCheckboxContext } from "./CheckboxContext";

type Props = {
  value: string;
  label: string;
};

export default function CheckboxGroupItem({ value, label }: Props) {
  const { field, helpers } = useCheckboxContext();
  const checked = Boolean(field.value && field.value.find((_) => _ === value));
  return (
    <div>
      <label style={{marginLeft: '50px'}}>
        <input
          {...field}
          type="checkbox"
          checked={checked}
          onChange={() => {
            if (checked) {
              helpers.setValue(field.value.filter((_) => _ !== value));
            } else {
              helpers.setValue([...field.value, value]);
            }
          }}
        />
        {label}
      </label>
    </div>
  );
}
