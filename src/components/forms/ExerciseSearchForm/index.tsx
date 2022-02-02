import React, { FC, useEffect, useState } from 'react';
import { ICategory, IEquipment, IExerciseSearch, IMuscle } from '../../../typescript/interfaces';
import API from '../../../utils/axios';
import { handleNotificationException } from '../../../utils/notifications';
import {ChooseCategories, ChooseEquipment, ChooseMuscles} from './ChooseElements';

export interface IElement<T> {
  element: T;
  selected: boolean;
}

export interface IExerciseSearchFormProps {
  exercises: IExerciseSearch[];
  setExercises: any;
}

const ExerciseSearchForm: FC<IExerciseSearchFormProps> = ({exercises, setExercises}) => {
  const [loading, setLoading] = useState(true)
  const [exerciseName, setExerciseName] = useState("");
  const [categories, setCategories] = useState<IElement<ICategory>[]>([])
  const [muscles, setMuscles] = useState<IElement<IMuscle>[]>([])
  const [equipment, setEquipment] = useState<IElement<IEquipment>[]>([])
  const [modalVariant, setModalVariant] = useState<"categories" | "equipment" | "muscles" | null>(null)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Loading categories
        {
          const res = await API.get<any>("/exercise-category");
          const categories = res.data.response.categories as ICategory[];
          const elements: IElement<ICategory>[] = categories.map(x => ({element: x, selected: false }));
          setCategories(elements);
        }
        // Loading muscles
        {
          const res = await API.get<any>("/muscle");
          const muscles = res.data.response.muscles as IMuscle[];
          const elements: IElement<IMuscle>[] = muscles.map(x => ({element: x, selected: false }));
          setMuscles(elements);
        }
        // Loading equipment
        {
          const res = await API.get<any>("/equipment");
          const equipment = res.data.response.equipment as IEquipment[];
          const elements: IElement<IEquipment>[] = equipment.map(x => ({element: x, selected: false }));
          setEquipment(elements);
        }
        setLoading(false)
      } catch (exc) {
        handleNotificationException(exc)
        setLoading(false)
      }
    })()
  }, [])

  const onSearchExerciseHandle = async (e) => {
    e.preventDefault();
    try {
      const equipmentIds = equipment.filter(eq => eq.selected).map(eq => eq.element.equipment_id).join(',');
      const muscleIds = muscles.filter(eq => eq.selected).map(eq => eq.element.muscle_id).join(',');
      const categoryIds = categories.filter(eq => eq.selected).map(eq => eq.element.category_id).join(',');
      const res = await API.get<any>('/exercise', {params: {name: exerciseName, equipment: equipmentIds, categories: categoryIds, muscles: muscleIds}})
      setExercises(res.data.response.exercises);
    } catch(exc) {
      handleNotificationException(exc);
    }
  }

  const onOpenModalCategories = (e) => {
    e.preventDefault();
    setModalVariant("categories")
    setOpen(true);
  }

  const onOpenModalMuscles = (e) => {
    e.preventDefault();
    setModalVariant("muscles")
    setOpen(true);
  }

  const onOpenModalEquipment = (e) => {
    e.preventDefault();
    setModalVariant("equipment")
    setOpen(true);
  }

  const onCloseModalHandle = (e) => {
    e.preventDefault();
    setModalVariant(null);
    setOpen(false);
  }

  return <>
    <dialog open={open}>
      <article style={{width: 500, maxHeight: 700}}>
        <a href="#close"
          aria-label="Close"
          className="close"
          data-target="modal-example"
          onClick={onCloseModalHandle}>
        </a>
        {
          modalVariant === "categories"
            ? <ChooseCategories elements={categories} setElements={setCategories} />
          : modalVariant === "equipment"
            ? <ChooseEquipment elements={equipment} setElements={setEquipment} />
          : modalVariant === "muscles"
            ? <ChooseMuscles elements={muscles} setElements={setMuscles} />
          : null
        }
        <footer>
          <a href="#confirm"
            role="button"
            data-target="modal-example"
            onClick={onCloseModalHandle}>
            Zamknij
          </a>
        </footer>
      </article>
    </dialog>
    <div>
      <input placeholder='Wpisz nazwę ćwiczenia' value={exerciseName} onChange={e => setExerciseName(e.target.value)} />
      <div className="grid">
        <button aria-busy={loading} disabled={loading} onClick={onOpenModalCategories} className="outline">Kategorie</button>
        <button aria-busy={loading} disabled={loading} onClick={onOpenModalMuscles} className="outline">Grupy mięśniowe</button>
        <button aria-busy={loading} disabled={loading} onClick={onOpenModalEquipment} className="outline">Sprzęt</button>
      </div>
      <button aria-busy={loading} disabled={loading} onClick={onSearchExerciseHandle}>Wyszukaj</button>
    </div>
  </>;
};

export default ExerciseSearchForm;
