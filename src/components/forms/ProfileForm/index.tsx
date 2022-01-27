import { FC } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../utils/axios';
import DateField from '../FormComponents/DateField';
import NumberField from '../FormComponents/NumberField';
import SelectField from '../FormComponents/SelectField';

export interface IProfileFormProps {
  dateOfBirth: string;
  height: number;
  sex: "M" | "F" | "O";
  setDateOfBirth: any;
  setHeight: any;
  setSex: any;
}

const options = [
  {value: "M", label: "Mężczyzna"},
  {value: "F", label: "Kobieta"},
  {value: "O", label: "Inna"},
]

const ProfileForm: FC<IProfileFormProps> = ({dateOfBirth, height, sex, setDateOfBirth, setHeight, setSex}) => {
  return <Formik
      initialValues={{
        dateOfBirth,
        height,
        sex
      }}
      validationSchema={Yup.object({
        dateOfBirth: Yup.date().required("Data urodzenia jest wymagana"),
        height: Yup.number().integer("Musi być liczbą całkowitą").min(1, "Minimum 1").max(250, "Maksymalnie 250").required("Wzrost jest wymagany"),
        sex: Yup.mixed().oneOf(["M", "F", "O"], "Musi być spośród dostępnych opcji").required('Płeć jest wymagana')
      })}
      onSubmit={async ({dateOfBirth, sex, height}, formikHelpers) => {
        try {
          console.log({dateOfBirth, sex, height})
          await API.post('/user/profile', {date_of_birth: dateOfBirth, sex, height});
          setDateOfBirth(dateOfBirth);
          setHeight(height);
          setSex(sex);
          formikHelpers.resetForm({values: {dateOfBirth, height, sex}})
        } catch (exc) {
          console.log(exc.response)
        }
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <div className="grid">
              <DateField noValidate={true} label="Data urodzenia" name="dateOfBirth" type="text" />
              <NumberField noValidate={true} label="Wzrost" name="height" min={1} max={250} step={1} />
              <SelectField noValidate={true} label="Płeć" name="sex" options={options} />
            </div>
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting} >Wyślij</button>
          </Form>
        )
      }
    </Formik>;
};

export default ProfileForm;
