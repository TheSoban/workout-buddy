import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseSearchForm from '../../../components/forms/ExerciseSearchForm';
import { IExerciseSearch } from '../../../typescript/interfaces';
import API from '../../../utils/axios';
import { handleNotificationException, handleNotificationResponse } from '../../../utils/notifications';

const ModeratorExercises = () => {
  const [exercises, setExercises] = useState<IExerciseSearch[]>([])
  const navigate = useNavigate();

  const deleteItem = async (id: number) => {
    try {
      const res = await API.post(`/exercise/${id}/delete`);
      setExercises(s => s.filter(x => x.exercise_id !== id))
      handleNotificationResponse(res);
    } catch (exc) {
      handleNotificationException(exc);
    }
  }

  return <div>
    <h1>Zarządzanie ćwiczeniami</h1>
    <button className="outline contrast" onClick={() => navigate("/panel/moderator/exercises/new")}>Dodaj ćwiczenie</button>
    <section>
      <ExerciseSearchForm exercises={exercises} setExercises={setExercises} />
    </section>
    <section>
      <figure>
        <table>
          <thead>
            <tr>
              <th>Identyfikator</th>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Wersja</th>
              <th>Data utworzenia</th>
              <th>Data edycji</th>
              <th>Edytuj</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {
              exercises.map(({createdAt, description, exercise_id, name, updatedAt, version}) => (
                <tr key={exercise_id}>
                  <th>{exercise_id}</th>
                  <th>{name}</th>
                  <th>{description}</th>
                  <th>{version}</th>
                  <th>{new Date(createdAt).toISOString().split("T")[0]}</th>
                  <th>{new Date(updatedAt).toISOString().split("T")[0]}</th>
                  <th><button style={{marginBottom: '0'}} className="outline" onClick={e => {e.preventDefault(); navigate(`edit/${exercise_id}`);}}>Edytuj</button></th>
                  <th><button style={{marginBottom: '0'}} className="contrast outline" onClick={e => {e.preventDefault(); deleteItem(exercise_id)}}>Usuń</button></th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </figure>
    </section>
  </div>;
};

export default ModeratorExercises;
