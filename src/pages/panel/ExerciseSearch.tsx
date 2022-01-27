import { useState } from "react";
import ExercisePreview from "../../components/ExercisePreview";
import ExerciseSearchForm from "../../components/forms/ExerciseSearchForm";
import { IExerciseSearch } from "../../typescript/interfaces";


const ExerciseSearch = () => {
  const [exercises, setExercises] = useState<IExerciseSearch[]>([])

  return <div>
    <ExerciseSearchForm exercises={exercises} setExercises={setExercises} />
    <div>
      {exercises.map(exercise => <ExercisePreview key={exercise.exercise_id} exercise={exercise} />)}
    </div>
  </div>;
};

export default ExerciseSearch;
