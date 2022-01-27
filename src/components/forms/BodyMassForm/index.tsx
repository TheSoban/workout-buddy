import { FC } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import API from '../../../utils/axios';
import NumberField from '../FormComponents/NumberField';
import TextField from '../FormComponents/TextField';
import { useParams } from 'react-router-dom';

export interface IBodyMassFormData {
  weight: number;
  water_percentage: number;
  body_fat: number;
  visceral_fat: number;
  muscle: number;
  bone_mass: number;
}

export interface IBodyMassFormProps {
  initialData: IBodyMassFormData | null;
  update: boolean;
}

const BodyMassForm: FC<IBodyMassFormProps> = ({initialData, update}) => {
  const params = useParams();
  return <Formik<IBodyMassFormData>
      initialValues={
        initialData ? {...initialData} : {
          body_fat: 0,
          bone_mass: 0,
          muscle: 0,
          visceral_fat: 0,
          water_percentage: 0,
          weight: 0
        }
      }
      validationSchema={Yup.object({
        body_fat: Yup.number().min(0, "Minimum 0").max(100, "Maksymalnie 100").required("Pole wymagane"),
        bone_mass: Yup.number().min(0, "Minimum 0").required("Pole wymagane"),
        muscle: Yup.number().min(0, "Minimum 0").required("Pole wymagane"),
        visceral_fat: Yup.number().integer("Liczba całkowita").min(0, "Minimum 0").required("Pole wymagane"),
        water_percentage: Yup.number().min(0, "Minimum 0").max(100, "Maksymalnie 100").required("Pole wymagane"),
        weight: Yup.number().min(0, "Minimum 0").required("Pole wymagane"),
      })}
      onSubmit={async (values) => {
        console.log(values)
        const data = {...values}
        try {
          if(update) {
            await API.post(`/user/body-measurement/${params.measurementId}/update`, data);
            alert('Zaktualizowano');
          } else {
            await API.post('/user/body-measurement', data);
            alert('Dodano');
          }
        } catch (exc) {
          console.log(exc.response);
        }
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <div className="grid">
              <TextField label='Waga [kg]' name="weight" />
              <NumberField min={0} max={100} step={0.1} label='Tłuszcz [%]' name="body_fat" />
            </div>
            <div className="grid">
              <NumberField min={0} max={20} step={1} label='Tłuszcz trzewny' name="visceral_fat" />
              <NumberField min={0} max={100} step={0.1} label='Woda [%]' name="water_percentage" />
            </div>
            <div className="grid">
              <TextField label='Masa mięśniowa [kg]' name="muscle" />
              <TextField label='Masa kostna [kg]' name="bone_mass" />
            </div>
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting}>Wyślij</button>
          </Form>
        )
      }
    </Formik>;
};

export default BodyMassForm;
