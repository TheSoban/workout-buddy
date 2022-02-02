import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkoutLogEditForm from '../../components/forms/WorkoutLogEditForm';
import { IWorkoutLog } from '../../typescript/interfaces';
import API from '../../utils/axios';
import { handleNotificationException } from '../../utils/notifications';

const LogEdit = () => {
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState<IWorkoutLog>(null)
  const params = useParams();

  const loadLog = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get<any>(`/user/workout-log/${params.logId}`);
      setLog(res.data.response.log)
      console.log(res.data.response.log)
    } catch (exc) {
      handleNotificationException(exc);
    }
    setLoading(false);
  }, [params.logId]);

  useEffect(() => {
    loadLog();
  },[loadLog]);

  if(loading) return <div>Loading...</div>

  return <WorkoutLogEditForm initialData={log} />;
};

export default LogEdit;
