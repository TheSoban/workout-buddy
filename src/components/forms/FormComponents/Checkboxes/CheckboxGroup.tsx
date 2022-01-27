import { useField } from "formik";
import { ReactNode } from "react";
import Item from "./CheckboxGroupItem";
import { CheckboxProvider } from "./CheckboxContext";

type Props = {
  children: ReactNode;
  name: string;
  label: string;
};

function CheckboxGroup({ name, label, children }: Props) {
  const [field, meta, helpers] = useField<string[]>(name);
  return (
    <CheckboxProvider value={{ field, helpers, meta }}>
      <details>
        <summary>{label}</summary>
        <div style={{gridTemplateColumns: 'repeat(3, 1fr)'}} className="grid" role="group" aria-labelledby="categories-group">
          {children}
        </div>
      </details>
    </CheckboxProvider>
  );
}

export default Object.assign(CheckboxGroup, { Item });
