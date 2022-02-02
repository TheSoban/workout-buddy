import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { IComment, IExercise } from '../../typescript/interfaces';
import API from '../../utils/axios';
import { handleNotificationException, handleNotificationResponse } from '../../utils/notifications';

import imagePlaceholder from '../../assets/image-placeholder.svg';

const ExerciseDetails = () => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true)
  const [commentValue, setCommentValue] = useState("")
  const [exercise, setExercise] = useState<IExercise>(null)
  const [comments, setComments] = useState<IComment[]>([])
  const {exerciseId} = useParams();
  const mainImage = exercise && exercise.images && exercise.images.length > 0 ? exercise.images.filter(img => img.is_main)[0].url : imagePlaceholder

  const loadItems = useCallback(async () => {
    try {
      const res = await API.get<any>(`/exercise/${exerciseId}`)
      const exercise = res.data.response.exercise as IExercise;
      setExercise(exercise);
      const res2 = await API.get<any>(`/exercise/${exerciseId}/comment`)
      setComments(res2.data.response.comments);
      setLoading(false);
    } catch(exc) {
      handleNotificationException(exc);
    }
  }, [exerciseId]);

  const sendComment = async () => {
    try {
      const res = await API.post(`/exercise/${exerciseId}/comment`, {content: commentValue})
      setCommentValue("");
      handleNotificationResponse(res)
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc);
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      const res = await API.post(`/exercise/${exerciseId}/comment/${commentId}/delete`)
      handleNotificationResponse(res);
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc);
    }
  }

  useEffect(() => {
    loadItems();
  }, [exerciseId, loadItems])

  if(loading) return <div>Loading...</div>

  return <div>
    <article className="grid">
      <div>
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
      </div>
      <div>
        <img width="100%" alt="mainImage" src={mainImage} />
      </div>
    </article>
    <article>
      <h3>Kategorie</h3>
      <p>
        {exercise.categories.length > 0 ? exercise.categories.map(x => x.name).join(', ') : "Brak kategorii"}
      </p>
    </article>
    <article>
      <h3>Grupy mięśniowe</h3>
      <p>
        {exercise.muscles.length > 0 ? exercise.muscles.map(x => x.name).join(', ') : "Brak grup mięśniowych"}
      </p>
    </article>
    <article>
      <h3>Sprzęt</h3>
      <p>
        {exercise.equipment.length > 0 ? exercise.equipment.map(x => x.name).join(', ') : "Brak sprzętu"}
      </p>
    </article>
    <article>
      <h3>Zdjęcia</h3>
      <div className="grid">
        {exercise.images.slice(1).length > 0 ? exercise.images.slice(1).map(image => <div><img alt={image.image_id + '-image'} src={image.url} /></div>) : "Brak zdjęć"}
      </div>
    </article>
    <h2>Komentarze</h2>
    <article>
      <input placeholder="Treść komentarza" type='text' value={commentValue} onChange={e => setCommentValue(e.target.value)} />
      <button onClick={() => sendComment()}>Skomentuj</button>
    </article>
    <>
      {comments.map(comment => <article key={comment.comment_id}>
        {user.role === "moderator" || user.role === "admin" || user.user_id === comment.author_id ? <button onClick={e => deleteComment(comment.comment_id)} className="outline contrast">Usuń</button> : null}
        <article>
          <hgroup>
          <h4>Autor: {comment.author}</h4>
          <h5>Zmodyfikowano: {new Date(comment.updatedAt).toISOString().split("T")[0]}</h5>
          </hgroup>
          <p>{comment.content}</p>
        </article>
      </article>)}
    </>
  </div>;
};

export default ExerciseDetails;
