import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IWorkoutLog } from '../../typescript/interfaces';
import API from '../../utils/axios';
import { handleNotificationException } from '../../utils/notifications';

const LogDetails = () => {
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState<IWorkoutLog>(null)
  const params = useParams();

  const loadItem = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get<any>(`user/workout-log/${params.logId}`)
      setLog(res.data.response.log)
    } catch(exc) {
      handleNotificationException(exc);
    }
    setLoading(false);
  },[params.logId])

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  if(loading) return <div>Loading...</div>

  const exercises = log.set_logs.length > 0 ? [[log.set_logs[0]]] : [];

  log.set_logs.slice(1).sort((a,b) => a.set_id - b.set_id).forEach((set_log) => {
    const last_exercise_group = exercises[exercises.length - 1]
    const last_log = last_exercise_group[last_exercise_group.length - 1] 
    if(set_log.exercise_id === last_log.exercise_id && set_log.order === last_log.order + 1) {
      last_exercise_group.push(set_log);
    } else {
      exercises.push([set_log])
    }
  })

  console.log(exercises)

  return <div>
    <hgroup>
      <h1>Rejestr treningu</h1>
      <h2>Nazwa: {log.name}</h2>
      <h3>Data: {new Date(log.date).toISOString().split("T")[0]}</h3>
    </hgroup>
    {exercises.map(exercise_logs => (
      <article key={exercise_logs[0].exercise.name}>
        <h3>{exercise_logs[0].exercise.name}</h3>
        <fieldset>
          <table>
            <thead>
              <tr>
                <th>Powtórzenia</th>
                <th>Wartość</th>
                <th>Jednostka</th>
              </tr>
            </thead>
            <tbody>
              {exercise_logs.map(log => (
                <tr key={log.set_id}>
                  <th>{log.repetitions}</th>
                  <th>{log.value}</th>
                  <th>{log.unit}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>
      </article>
    ))}
    {}
  </div>;
};

export default LogDetails;
