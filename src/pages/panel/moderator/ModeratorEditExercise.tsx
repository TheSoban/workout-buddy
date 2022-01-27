import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ExerciseForm, { IExerciseFormData } from '../../../components/forms/ExerciseForm';
import { IExercise } from '../../../typescript/interfaces';
import API from '../../../utils/axios';

const ModeratorEditExercise = () => {
  const [loading, setLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState<IExerciseFormData>(null);
  const {exerciseId} = useParams();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await API.get<any>(`/exercise/${exerciseId}`);
        const exercise = res.data.response.exercise as IExercise;
        console.log(exercise)
        const exerciseInitial: IExerciseFormData = {
          name: '',
          description: '',
          muscles: [],
          categories: [],
          equipment: [],
          images: []
        }

        exerciseInitial.name = exercise.name;
        exerciseInitial.description = exercise.description;
        exerciseInitial.equipment = exercise.equipment.map(eq => String(eq.equipment_id));
        exerciseInitial.muscles = exercise.muscles.map(eq => String(eq.muscle_id));
        exerciseInitial.categories = exercise.categories.map(eq => String(eq.category_id));
        exerciseInitial.images = exercise.images.map(eq => eq.url);
        setExerciseData(exerciseInitial)
      } catch (exc) {
        console.log(exc.response)
      }
      setLoading(false);
    })()
  }, [exerciseId])

  if(loading) return <div>Loading...</div>

  if(!exerciseData) return <Navigate to="/panel/moderator/exercises" />

  return <ExerciseForm update initialData={exerciseData} />
};

export default ModeratorEditExercise;
