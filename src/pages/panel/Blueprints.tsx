import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBlueprint } from '../../typescript/interfaces';
import API from '../../utils/axios';
import { handleNotificationException, handleNotificationResponse } from '../../utils/notifications';

const Blueprints = () => {
  const [loading, setLoading] = useState(true);
  const [blueprints, setBlueprints] = useState<IBlueprint[]>([]);
  const navigate = useNavigate();

  const loadItems = async () => {
    setLoading(true);
    try {
        const res = await API.get<any>('/user/workout-blueprint');
        setBlueprints(res.data.response.blueprints)
      } catch (exc) {
        handleNotificationException(exc);
      }
      setLoading(false);
  }

  const deleteItem = async (id: number) => {
    try {
      const res = await API.post(`/user/workout-blueprint/${id}/delete`)
      handleNotificationResponse(res);
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc);
    }
  }

  useEffect(() => {
    loadItems();
  },[])

  if(loading) return <div>Loading...</div>

  return <div>
    <h1>Zarządzanie schematami treningów</h1>
    <button onClick={() => navigate('new')} className="outline contrast">Stwórz nowy schemat</button>
    <fieldset>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Kolor</th>
            <th>Liczba ćwiczeń</th>
            <th>Edytuj</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {
            blueprints && blueprints.length > 0
            ? blueprints.map(blueprint => (
              <tr key={blueprint.blueprint_id}>
                <th>{blueprint.name}</th>
                <th>{blueprint.description}</th>
                <th><input style={{margin: '0'}} disabled type="color" value={blueprint.color} /></th>
                <th>{blueprint.ordered_exercises.length}</th>
                <th><button onClick={() => navigate(`edit/${blueprint.blueprint_id}`)} style={{marginBottom: '0'}} className="outline">Edytuj</button></th>
                <th><button onClick={() => deleteItem(blueprint.blueprint_id)} style={{marginBottom: '0'}} className="outline contrast">Usuń</button></th>
              </tr>
            ))
            : null
          }
        </tbody>
      </table>
    </fieldset>
  </div>;
};

export default Blueprints;
