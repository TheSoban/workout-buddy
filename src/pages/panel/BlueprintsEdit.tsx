import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlueprintForm from '../../components/forms/BlueprintForm';
import { IBlueprint } from '../../typescript/interfaces';
import API from '../../utils/axios';
import { handleNotificationException } from '../../utils/notifications';

const BlueprintsEdit = () => {
  const [loading, setLoading] = useState(true);
  const [blueprint, setBlueprint] = useState<IBlueprint>(null);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await API.get<any>(`/user/workout-blueprint/${params.blueprintId}`);
        console.log(res)
        setBlueprint(res.data.response.blueprint);
      } catch (exc) {
        handleNotificationException(exc);
      }
      setLoading(false);
    })()
  }, [params.blueprintId])

  if (loading) return <div>Loading...</div>

  return blueprint && <div>
    <h1>Edytuj schemat treningu</h1>
    <BlueprintForm update={true} initialData={{color: '#ffffff', name: blueprint.name, description: blueprint.description, ordered_exercises: blueprint.ordered_exercises.map(({exercise_id, exercise: {name}}) => ({exercise_id, name}))}} />;
    </div>
};

export default BlueprintsEdit;
