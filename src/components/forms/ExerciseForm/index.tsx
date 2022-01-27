import { FieldArray, Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { ICategory, IEquipment, IMuscle } from '../../../typescript/interfaces';
import API from '../../../utils/axios';
import CheckboxGroup from '../FormComponents/Checkboxes/CheckboxGroup';
import TextField from '../FormComponents/TextField';

export interface IExerciseFormData {
  name: string;
  description: string;
  categories: string[];
  equipment: string[];
  muscles: string[];
  images: string[];
}

export interface IExerciseFormProps {
  initialData: IExerciseFormData | null;
  update: boolean;
}

const ExerciseForm: FC<IExerciseFormProps> = ({update, initialData}) => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([])
  const [muscles, setMuscles] = useState<IMuscle[]>([])
  const [equipment, setEquipment] = useState<IEquipment[]>([])

  useEffect(() => {
    (async () => {
      try {
        // Loading categories
        {
          const res = await API.get<any>("/exercise-category");
          const categories = res.data.response.categories as ICategory[];
          setCategories(categories);
        }
        // Loading muscles
        {
          const res = await API.get<any>("/muscle");
          const muscles = res.data.response.muscles as IMuscle[];
          setMuscles(muscles);
        }
        // Loading equipment
        {
          const res = await API.get<any>("/equipment");
          const equipment = res.data.response.equipment as IEquipment[];
          setEquipment(equipment);
        }
      } catch (exc) {
        console.log(exc)
      }
      setLoading(false)
    })()
  }, [])

  return loading ? null : <Formik<IExerciseFormData>
      initialValues={
        initialData ? {...initialData} : {
          name: '',
          description: '',
          muscles: [],
          categories: [],
          equipment: [],
          images: []
        }
      }
      validationSchema={Yup.object({
        name: Yup.string().min(1).max(50).required("Nazwa jest wymagana"),
        description: Yup.string().min(1).max(300).required("Opis jest wymagane"),
        images: Yup.array().of(Yup.string().url("Nie podano poprawnego URL").required("Pole jest wymagane jest wymagany"))
      })}
      onSubmit={async (values) => {
        console.log(values)
        const data = {...values,
          equipment: values.equipment.map(x => +x),
          muscles: values.muscles.map(x => +x),
          categories: values.categories.map(x => +x),
          version: 1
        }
        try {
          if(update) {
            await API.post(`/exercise/${params.exerciseId}/update`, data);
            alert('Zaktualizowano');
          } else {
            await API.post('/exercise', data);
            alert('Dodano');
          }
          
        } catch (exc) {
          console.log(exc.response);
        }
      }}
    >
      {
        ({handleSubmit, isSubmitting, isValid, dirty, values }) => (
          <Form noValidate onSubmit={(e) => {e.preventDefault();handleSubmit(e)}}>
            <article>
              <details>
                <summary>Dane ćwiczenia</summary>
                <div className="grid">
                  <TextField label='Nazwa' name="name" />
                  <TextField label="Opis" name="description" />
                </div>
              </details>
              <CheckboxGroup name="categories" label="Kategorie">
                {categories.map(category => <CheckboxGroup.Item key={category.category_id} label={category.name} value={`${category.category_id}`} />)}
              </CheckboxGroup>
              <CheckboxGroup name="muscles" label="Mięśnie">
                {muscles.map(muscle => <CheckboxGroup.Item key={muscle.muscle_id} label={muscle.name} value={`${muscle.muscle_id}`} />)}
              </CheckboxGroup>
              <CheckboxGroup name="equipment" label="Sprzęt">
                {equipment.map(equipment => <CheckboxGroup.Item key={equipment.equipment_id} label={equipment.name} value={`${equipment.equipment_id}`} />)}
              </CheckboxGroup>
            </article>
            <article>
              <FieldArray
                name="images"
                render={arrayHelpers => (
                  <details>
                    <summary>Zdjęcia</summary>
                    <fieldset>
                      <table>
                        <thead>
                          <tr>
                            <th>URL</th>
                            <th>Akcja</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            values.images && values.images.length > 0
                              && values.images.map((image, index) => (
                                <tr key={index}>
                                    <th>
                                      <TextField name={`images.${index}`} value={image} />
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
                    </fieldset>
                    <button type="button" onClick={() => arrayHelpers.push('')}>
                      Dodaj zdjęcie
                    </button>
                  </details>
                )}
              />
            </article>
            <button type="submit" disabled={!(isValid && dirty)} aria-busy={isSubmitting}>Wyślij</button>
          </Form>
        )
      }
    </Formik>;
};

export default ExerciseForm;
