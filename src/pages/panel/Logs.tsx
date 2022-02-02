import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IWorkoutLog } from '../../typescript/interfaces';
import API from '../../utils/axios';
import { handleNotificationException, handleNotificationResponse } from '../../utils/notifications';

const Logs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<IWorkoutLog[]>([]);
  const navigate = useNavigate();

  const loadItems = async () => {
    setLoading(true);
    try {
        const res = await API.get<any>('/user/workout-log');
        setLogs(res.data.response.logs)
      } catch (exc) {
        handleNotificationException(exc);
      }
      setLoading(false);
  }

  const deleteItem = async (id: number) => {
    try {
      const res = await API.post(`/user/workout-log/${id}/delete`)
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
    <button onClick={() => navigate('new')} className="outline contrast">Stwórz nowy rejestr</button>
    <fieldset>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Data utworzenia</th>
            <th>Data modyfikacji</th>
            <th>Podgląd</th>
            <th>Edytuj</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {
            logs && logs.length > 0
            ? logs.map(log => (
              <tr key={log.log_id}>
                <th>{log.name}</th>
                <th>{log.createdAt}</th>
                <th>{log.updatedAt}</th>
                <th><button onClick={() => navigate(`${log.log_id}`)} style={{marginBottom: '0'}} className="outline">Podgląd</button></th>
                <th><button onClick={() => navigate(`edit/${log.log_id}`)} style={{marginBottom: '0'}} className="outline">Edytuj</button></th>
                <th><button onClick={() => deleteItem(log.log_id)} style={{marginBottom: '0'}} className="outline contrast">Usuń</button></th>
              </tr>
            ))
            : null
          }
        </tbody>
      </table>
    </fieldset>
  </div>;
};

export default Logs;
