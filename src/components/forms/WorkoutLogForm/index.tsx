import { FC } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { handleNotificationException, handleNotificationResponse } from '../../../utils/notifications';
import { IBlueprint } from '../../../typescript/interfaces';
import TextField from '../FormComponents/TextField';
import DateField from '../FormComponents/DateField';
import NumberField from '../FormComponents/NumberField';
import SelectField from '../FormComponents/SelectField';
import API from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';

export interface IWorkoutLogFormData {
  name: string;
  date: string;
  exercises_logs: {
    exercise_id: number;
    order: number;
    repetitions: number;
    value: number;
    unit: 'kg' | 'lbs';
  }[][];
};

export interface IWorkoutLogFormProps {
  initialData: IBlueprint | null;
}

const WorkoutLogForm: FC<IWorkoutLogFormProps> = ({initialData}) => {
  const navigate = useNavigate();

  const initialValues: IWorkoutLogFormData = {
    name: '',
    date: '',
    exercises_logs: initialData.ordered_exercises.sort((a,b) => a.order-b.order).map(exercise => ([]))
  }

  return <Formik<IWorkoutLogFormData>
      initialValues={{...initialValues}}
      validationSchema={Yup.object({
        name: Yup.string().max(50).required("Wymagane pole"),
        date: Yup.date().required("Wymagane pole"),
        exercises_logs: Yup.array().of(Yup.array().of(Yup.object().shape({
          exercise_id: Yup.number().integer().required('Pole wymagane'),
          order: Yup.number().integer().required("Pole wymagane"),
          repetitions: Yup.number().integer().required('Pole wymagane'),
          value: Yup.number().integer().required('Pole wymagane'),
          unit: Yup.string().oneOf(['kg', 'lbs'])
        })))
      })}
      onSubmit={async (values) => {
        const dataToBeSent = {
          name: values.name,
          date: values.date,
          exercises: values.exercises_logs.flat()
        }
        try {
          const res = await API.post('/user/workout-log', dataToBeSent)
          handleNotificationResponse(res);
          navigate('/panel/logs', {replace: true})
        } catch (exc) {
          handleNotificationException(exc);
        }
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, dirty, values }) => (
          <Form noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <article>
              <h3>Informacje</h3>
              <TextField label='Nazwa' name="name" />
              <DateField label="Data" name="date" />
            </article>
            <FieldArray name="exercises_logs" render={arrayHelpers => {
              return values.exercises_logs.map(((exercise_logs, idx) => (
                <article key={idx+'-exercise'}>
                  <h3>{initialData.ordered_exercises[idx].exercise.name}</h3>
                  <button type="button" onClick={() => arrayHelpers.replace(idx, ([...exercise_logs, {
                    exercise_id: initialData.ordered_exercises[idx].exercise.exercise_id,
                    order: exercise_logs.length + 1,
                    repetitions: 0,
                    value: 0,
                    unit: 'kg'
                  }]))}>Dodaj serię</button>
                  <fieldset>
                    <table>
                      <thead>
                        <tr>
                          <th>Liczba powtórzeń</th>
                          <th>Wartość</th>
                          <th>Jednostka</th>
                          <th>Usuń</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.exercises_logs[idx].map((log, log_idx) => (
                          <tr key={log_idx+'-log'}>
                            <th><NumberField min={0} step={1} max={1000} name={`exercises_logs.${idx}.${log_idx}.repetitions`} /></th>
                            <th><NumberField min={0} step={1} max={1000} name={`exercises_logs.${idx}.${log_idx}.value`} /></th>
                            <th>
                              <SelectField noValidate name={`exercises_logs.${idx}.${log_idx}.unit`} options={[{label: 'Kilogramy', value: 'kg'}, {label: 'Funty', value: 'lbs'}]} />
                            </th>
                            <th>
                              <button type="button" onClick={() => arrayHelpers.replace(idx, ([...exercise_logs.filter((_,i) => log_idx !== i)]))}>-</button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </fieldset>
                </article>
              )))
            }}/>
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting}>Wyślij</button>
          </Form>
        )
      }
    </Formik>;
};

export default WorkoutLogForm;
