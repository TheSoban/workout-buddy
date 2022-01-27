import { FieldArray, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { IExercise } from '../../../typescript/interfaces';
import API from '../../../utils/axios';
import TextField from '../FormComponents/TextField';

export interface IBlueprintFormData {
  name: string;
  description: string;
  ordered_exercises: {
    exercise_id: number;
    name: string;
  }[];
}

export interface IBlueprintFormProps {
  initialData: IBlueprintFormData | null;
  update: boolean;
}

const BlueprintForm: FC<IBlueprintFormProps> = ({initialData, update}) => {
  const [searchedExercises, setSearchedExercises] = useState<IExercise[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const searchExercise = async (value: string) => {
    try {
      const res = await API.get<any>('/exercise', {params: {name: value}})
      setSearchedExercises(res.data.response.exercises);
    } catch (exc) {
      console.log(exc.response);
    }
  }

  const closeModal = (e) => {
    e.preventDefault();
    setSearchedExercises([]);
    setOpen(false);
    setValue("");
  }

  return <Formik<IBlueprintFormData>
      initialValues={
        initialData ? {...initialData} : {
          name: '',
          description: '',
          ordered_exercises: []
        }
      }
      validationSchema={Yup.object({
        name: Yup.string().max(50).required("Wymagane pole"),
        description: Yup.string().max(300).required("Wymagane pole"),
        ordered_exercises: Yup.array().of(Yup.object({exercise_id: Yup.number().integer(), name: Yup.string().required("Wymagane pole")}))
      })}
      onSubmit={async (values) => {
        try {
          if(update) {
            await API.post(`/user/workout-blueprint/${params.blueprintId}/update`,{name: values.name, description: values.description, color: 'blue', exercises: values.ordered_exercises.map(x => x.exercise_id)})
            alert("Nadpisano blueprint");
            navigate('/panel/blueprints')
          } else {
            await API.post('/user/workout-blueprint',{name: values.name, description: values.description, color: 'blue', exercises: values.ordered_exercises.map(x => x.exercise_id)})
            alert("Utworzono blueprint");
            navigate('/panel/blueprints')
          }
        } catch (exc) {
          console.log(exc);
        }
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, dirty, values }) => (
          <Form noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <article>
              <h3>Informacje</h3>
              <TextField label='Nazwa' name="name" />
              <TextField label="Opis" name="description" />
            </article>
            <article>
              <h3>Ćwiczenia</h3>
              <FieldArray
                name="ordered_exercises"
                render={arrayHelpers => { 
                  return(
                  <>
                    <dialog open={open}>
                      <article style={{width: 500, maxHeight: 700}}>
                        <a href="#close"
                          aria-label="Close"
                          className="close"
                          data-target="modal-example"
                          onClick={closeModal}
                        >
                        </a>
                        <div>
                          <input type="text" value={value} onChange={e => {
                            setValue(e.target.value);
                          }} />
                          <button type="button" onClick={() => searchExercise(value)}>Szukaj</button>
                        </div>
                        <div>
                          {searchedExercises.map((exercise, idx) => <button type="button"
                            className="outline contrast"
                            key={idx+1}
                            onClick={() => {
                              arrayHelpers.push({exercise_id: exercise.exercise_id, name: exercise.name})
                              setValue("");
                              setSearchedExercises([])
                              setOpen(false)
                            }}>
                            {exercise.name}
                          </button>)}
                        </div>
                      </article>
                    </dialog>
                    <fieldset>
                      <table>
                        <thead>
                          <tr>
                            <th>Lp.</th>
                            <th>Nazwa</th>
                            <th>Akcja</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            values.ordered_exercises && values.ordered_exercises.length > 0
                              && values.ordered_exercises.map((exercise, index) => (
                                <tr key={index}>
                                    <th>
                                      {exercise.exercise_id}
                                    </th>
                                    <th>
                                      {exercise.name}
                                    </th>
                                    <th>
                                      <button style={{marginBottom: '0'}}
                                        type="button"
                                        className="contrast"
                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                      >
                                        -
                                      </button>
                                    </th>
                                  </tr>
                              ))
                          }
                        </tbody>
                      </table>
                      <button type="button" onClick={() => setOpen(true)}>Dodaj ćwiczenie</button>
                    </fieldset>
                  </>
                )}}
              />
            </article>
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting}>Wyślij</button>
          </Form>
        )
      }
    </Formik>;
};

export default BlueprintForm;
