import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IExerciseSearch } from '../typescript/interfaces';

export interface IExercisePreviewProps {
  exercise: IExerciseSearch
}

const ExercisePreview: FC<IExercisePreviewProps> = ({exercise}) => {
  const navigate = useNavigate();

  const onClickHandle = e => {
    e.preventDefault();
    navigate(exercise.exercise_id.toString());
  }

  return <article onClick={onClickHandle} className="grid" style={{gridTemplateColumns: '40% 60%', marginBottom: '1rem', cursor: 'pointer'}}>
    <div>{exercise.name}</div>
    <div>{exercise.description.slice(0,100) + '...'}</div>
  </article>;
};

export default ExercisePreview;
