import React from 'react';
import BodyMassForm from '../../components/forms/BodyMassForm';

const BodyMassNew = () => {
  return <div>
    <h1>Nowy wpis składu masy ciała</h1>
    <BodyMassForm update={false} initialData={null} />
  </div>;
};

export default BodyMassNew;
