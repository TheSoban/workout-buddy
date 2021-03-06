import { FC } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { handleNotificationException, handleNotificationResponse } from '../../../utils/notifications';
import { IWorkoutLog } from '../../../typescript/interfaces';
import TextField from '../FormComponents/TextField';
import DateField from '../FormComponents/DateField';
import NumberField from '../FormComponents/NumberField';
import SelectField from '../FormComponents/SelectField';
import API from '../../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

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
  initialData: IWorkoutLog | null;
}

const WorkoutLogEditForm: FC<IWorkoutLogFormProps> = ({initialData}) => {
  const params = useParams();
  const navigate = useNavigate();

  const exercises = initialData.set_logs.length > 0 ? [[{
    exercise_id: initialData.set_logs[0].exercise_id,
    repetitions: initialData.set_logs[0].repetitions,
    order: initialData.set_logs[0].order,
    value: initialData.set_logs[0].value,
    unit: initialData.set_logs[0].unit,
  }]] : [];

  initialData.set_logs.slice(1).sort((a,b) => a.set_id - b.set_id).forEach((set_log) => {
    const last_exercise_group = exercises[exercises.length - 1]
    const last_log = last_exercise_group[last_exercise_group.length - 1] 
    if(set_log.exercise_id === last_log.exercise_id && set_log.order === last_log.order + 1) {
      last_exercise_group.push({
        exercise_id: set_log.exercise_id,
        repetitions: set_log.repetitions,
        order: set_log.order,
        value: set_log.value,
        unit: set_log.unit,
      });
    } else {
      exercises.push([{
        exercise_id: set_log.exercise_id,
        repetitions: set_log.repetitions,
        order: set_log.order,
        value: set_log.value,
        unit: set_log.unit,
      }])
    }
  })

  const exercises_data = exercises.map(block => ({exercise_id: block[0].exercise_id}))

  const initialValues: IWorkoutLogFormData = {
    name: initialData.name,
    date: new Date(initialData.date).toISOString().split("T")[0],
    exercises_logs: exercises
  }
  console.log(initialData)
  console.log(initialValues)

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
          const res = await API.post(`/user/workout-log/${params.logId}/update`, dataToBeSent)
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
                  <h3>{initialData.set_logs[exercises.slice(0, idx).map(s => s.length).reduce((a,b) => a+b, 0)].exercise.name}</h3>
                  <button type="button" onClick={() => arrayHelpers.replace(idx, ([...exercise_logs, {
                    exercise_id: exercises_data[idx].exercise_id,
                    order: exercise_logs.length + 1,
                    repetitions: 0,
                    value: 0,
                    unit: 'kg'
                  }]))}>Dodaj seri??</button>
                  <fieldset>
                    <table>
                      <thead>
                        <tr>
                          <th>Liczba powt??rze??</th>
                          <th>Warto????</th>
                          <th>Jednostka</th>
                          <th>Usu??</th>
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
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting}>Wy??lij</button>
          </Form>
        )
      }
    </Formik>;
};

export default WorkoutLogEditForm;
