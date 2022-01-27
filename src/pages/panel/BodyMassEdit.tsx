import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BodyMassForm from '../../components/forms/BodyMassForm';
import { IBodyMeasurement } from '../../typescript/interfaces';
import API from '../../utils/axios';

const BodyMassEdit = () => {
  const [loading, setLoading] = useState(true);
  const [measurement, setMeasurement] = useState<IBodyMeasurement>(null);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await API.get<any>(`/user/body-measurement/${params.measurementId}`);
        console.log(res)
        setMeasurement(res.data.response.measurement);
      } catch (exc) {
        console.log(exc.response)
      }
      setLoading(false);
    })()
  }, [])

  if (loading) return <div>Loading...</div>

  return measurement && <BodyMassForm update={true} initialData={measurement} />;
};

export default BodyMassEdit;
