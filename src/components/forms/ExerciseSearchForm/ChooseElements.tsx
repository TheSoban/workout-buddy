import { FC } from 'react';
import { IElement } from '.';
import { ICategory, IEquipment, IMuscle } from '../../../typescript/interfaces';

export interface IChooseElementsProps<T> {
  elements: IElement<T>[];
  setElements: React.Dispatch<React.SetStateAction<IElement<T>[]>>;
}

export const ChooseCategories: FC<IChooseElementsProps<ICategory>> = ({elements, setElements}) => {
  const toggleSelection = (element: IElement<ICategory>) => {
    setElements(s => s.map(el => el.element.category_id === element.element.category_id ? ({...el, selected: !el.selected}) : el))
  }
  return <p>
    {elements.map(element => <button className={element.selected ? null : "outline"} key={element.element.category_id} onClick={e => {e.preventDefault(); toggleSelection(element)}}>{element.element.name}</button>)}
  </p>;
};

export const ChooseMuscles: FC<IChooseElementsProps<IMuscle>> = ({elements, setElements}) => {
  const toggleSelection = (element: IElement<IMuscle>) => {
    setElements(s => s.map(el => el.element.muscle_id === element.element.muscle_id ? ({...el, selected: !el.selected}) : el))
  }
  return <p>
    {elements.map(element => <button className={element.selected ? null : "outline"} key={element.element.muscle_id} onClick={e => {e.preventDefault(); toggleSelection(element)}}>{element.element.name}</button>)}
  </p>;
};

export const ChooseEquipment: FC<IChooseElementsProps<IEquipment>> = ({elements, setElements}) => {
  const toggleSelection = (element: IElement<IEquipment>) => {
    setElements(s => s.map(el => el.element.equipment_id === element.element.equipment_id ? ({...el, selected: !el.selected}) : el))
  }
  return <p>
    {elements.map(element => <button className={element.selected ? null : "outline"} key={element.element.equipment_id} onClick={e => {e.preventDefault(); toggleSelection(element)}}>{element.element.name}</button>)}
  </p>;
};

