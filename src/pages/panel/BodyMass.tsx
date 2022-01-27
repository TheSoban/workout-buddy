import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBodyMeasurement } from '../../typescript/interfaces';
import API from '../../utils/axios';

const BodyMass = () => {
  const [loading, setLoading] = useState(true);
  const [measurements, setMeasurements] = useState<IBodyMeasurement[]>([]);
  const navigate = useNavigate();

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await API.get<any>('/user/body-measurement');
      setMeasurements(res.data.response.measurements);
    } catch (exc) {
      console.log(exc.response)
    }
    setLoading(false);
  }

  const deleteMeasurement = async (id: number) => {
    try {
      await API.post(`/user/body-measurement/${id}/delete`);
      await loadItems();
      alert('Usunięto wpis');
    } catch (exc) {
      console.log(exc.response);
    }
  }

  const calculateBMI = async (id: number) => {
    try {
      const res = await API.get<any>(`/user/body-measurement/${id}`);
      const BMI = res.data.response.BMI;
      alert(`Obliczone BMI: ${BMI}`);
    } catch (exc) {
      console.log(exc.response);
    }
  }

  useEffect(() => {
    loadItems();
  }, [])

  if (loading) return <div>Loading...</div>

  return <div>
    <h1>Rejestr składu masy ciała</h1>
    <button className="contrast outline" onClick={() => navigate('new')}>Dodaj wpis</button>
    <fieldset>
      <table>
        <thead>
          <tr>
            <th>Waga [kg]</th>
            <th>Tłuszcz [%]</th>
            <th>Tłuszcz trzewny</th>
            <th>Woda [%]</th>
            <th>Masa mięśniowa [kg]</th>
            <th>Masa kostna [kg]</th>
            <th>Utworzono</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            measurements && measurements.length > 0
            // @ts-ignore
              && measurements.map(({measurement_id,body_fat,bone_mass,createdAt,muscle,updatedAt,visceral_fat,water_percentage,weight}) => (
                <tr key={measurement_id}>
                  <th>{weight}</th>
                  <th>{body_fat}</th>
                  <th>{visceral_fat}</th>
                  <th>{water_percentage}</th>
                  <th>{muscle}</th>
                  <th>{bone_mass}</th>
                  <th>{new Date(createdAt).toISOString().split("T")[0]}</th>
                  <th>
                    <button style={{marginBottom: '0'}} onClick={() => calculateBMI(measurement_id)}>
                      BMI
                    </button>
                  </th>
                  <th>
                    <button style={{marginBottom: '0'}} className="outline" onClick={() => navigate(`edit/${measurement_id}`)}>Edytuj</button>
                  </th>
                  <th>
                    <button style={{marginBottom: '0'}} className="outline contrast" onClick={() => deleteMeasurement(measurement_id)}>Usuń</button>
                  </th>
                </tr>
              ))
          }
        </tbody>
      </table>
    </fieldset>
  </div>
};

// sort((a, b) => (new Date(a.createdAt) - new Date(b.createdAt))).
export default BodyMass;
