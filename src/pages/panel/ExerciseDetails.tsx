import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { IExercise } from '../../typescript/interfaces';
import API from '../../utils/axios';

const ExerciseDetails = () => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true)
  const [commentValue, setCommentValue] = useState("")
  const [exercise, setExercise] = useState<IExercise>(null)
  const {exerciseId} = useParams();
  const mainImage = exercise && exercise.images && exercise.images.length > 0 ? exercise.images.filter(img => img.is_main)[0].url : "#"

  const loadItems = async () => {
    try {
      const res = await API.get<any>(`/exercise/${exerciseId}`)
      const exercise = res.data.response.exercise as IExercise;
      console.log(exercise)
      setExercise(exercise);
      setLoading(false);
    } catch(exc) {
      console.log(exc);
    }
  }

  const sendComment = async () => {
    try {
      await API.post(`/exercise/${exerciseId}/comment`, {content: commentValue})
      setCommentValue("");
      await loadItems();
      alert('Dodano komentarz');
    } catch (exc) {
      console.log(exc);
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      await API.post(`/exercise/${exerciseId}/comment/${commentId}/delete`)
      await loadItems();
      alert('Usunięto komentarz');
    } catch (exc) {
      console.log(exc);
    }
  }

  useEffect(() => {
    loadItems();
  }, [exerciseId])

  if(loading) return <div>Loading...</div>

  return <div>
    <article className="grid">
      <div>
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
      </div>
      <div style={{background: `url(${mainImage})`}}></div>
    </article>
    <article>
      <h3>Kategorie</h3>
      <div className="grid">
        {exercise.categories.map(category => <span key={category.category_id}>{category.name}</span>)}
      </div>
    </article>
    <article>
      <h3>Grupy mięśniowe</h3>
      <div className="grid">
        {exercise.muscles.map(muscle => <span key={muscle.muscle_id}>{muscle.name}</span>)}
      </div>
    </article>
    <article>
      <h3>Sprzęt</h3>
      <div className="grid">
        {exercise.equipment.map(equipment => <span key={equipment.equipment_id}>{equipment.name}</span>)}
      </div>
    </article>
    <h2>Komentarze</h2>
    <article>
      <input placeholder="Treść komentarza" type='text' value={commentValue} onChange={e => setCommentValue(e.target.value)} />
      <button onClick={() => sendComment()}>Skomentuj</button>
    </article>
    <>
      {exercise.comments.map(comment => <article key={comment.comment_id}>
        {user.role === "moderator" || user.role === "admin" || user.user_id == comment.author_id ? <button onClick={e => deleteComment(comment.comment_id)} className="outline contrast">Usuń</button> : null}
        <article>{comment.content}</article>
      </article>)}
    </>
  </div>;
};

export default ExerciseDetails;
