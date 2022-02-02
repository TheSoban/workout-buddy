import { useCallback, useEffect, useState } from 'react';
import WorkoutLogForm from '../../components/forms/WorkoutLogForm';
import { IBlueprint } from '../../typescript/interfaces';
import API from '../../utils/axios';
import { handleNotificationException } from '../../utils/notifications';

const LogsNew = () => {
  const [loading, setLoading] = useState(true);
  const [blueprints, setBlueprints] = useState<IBlueprint[]>([])
  const [selectedBlueprint, setSelectedBlueprint] = useState(-1);

  const loadBlueprints = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get<any>('/user/workout-blueprint');
      setBlueprints(res.data.response.blueprints)
    } catch (exc) {
      handleNotificationException(exc);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadBlueprints();
  },[loadBlueprints]);

  if(loading) return <div>Loading...</div>
  if(selectedBlueprint === -1) return <div>
    <fieldset>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Kolor</th>
            <th>Liczba ćwiczeń</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {
            blueprints && blueprints.length > 0
            ? blueprints.map((blueprint, idx) => (
              <tr key={blueprint.blueprint_id}>
                <th>{blueprint.name}</th>
                <th>{blueprint.description}</th>
                <th><input style={{margin: '0'}} disabled type="color" value={blueprint.color} /></th>
                <th>{blueprint.ordered_exercises.length}</th>
                <th><button onClick={() => setSelectedBlueprint(idx)} style={{marginBottom: '0'}} className="outline contrast">Wybierz</button></th>
              </tr>
            ))
            : null
          }
        </tbody>
      </table>
    </fieldset>
  </div>

  return <WorkoutLogForm initialData={blueprints[selectedBlueprint]} />;
};

export default LogsNew;
