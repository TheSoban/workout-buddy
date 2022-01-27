import React from 'react';
import BlueprintForm from '../../components/forms/BlueprintForm';

const BlueprintsNew = () => {
  return <div>
    <h1>Nowy schemat treningu</h1>
    <BlueprintForm update={false} initialData={null} />
  </div>;
};

export default BlueprintsNew;
