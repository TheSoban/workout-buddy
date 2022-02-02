import { useEffect, useState } from 'react';
import { ICategory } from '../../../typescript/interfaces';
import API from '../../../utils/axios';
import { handleNotificationException, handleNotificationResponse } from '../../../utils/notifications';

const ModeratorCategories = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([])
  const [open, setOpen] = useState(false);
  const [newElement, setNewElement] = useState(false);
  const [id, setId] = useState(0);
  const [value, setValue] = useState("");

  const loadItems = async () => {
    setLoading(true);
    try {
        const res = await API.get<any>('/exercise-category');
        setCategories(res.data.response.categories as ICategory[]);
      } catch(exc) {
        console.log(exc?.response)
      }
      setLoading(true);
  }

  useEffect(() => {
    loadItems();
  }, [])


  const updateItem = async () => {
    setUpdating(true);
    try {
      const res = await API.post(`/exercise-category/${id}/update`, {name: value});
      handleNotificationResponse(res);
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc);
    }
    setUpdating(false)
  }

  const deleteItem = async (id: number) => {
    try {
      const res = await API.post(`/exercise-category/${id}/delete`);
      handleNotificationResponse(res);
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc)
    }
  }

  const addItem = async () => {
    setUpdating(true)
    try {
      const res = await API.post(`/exercise-category`, {name: value});
      handleNotificationResponse(res)
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc)
    }
    setUpdating(false)
  }

  const onOpenAddModalHandle = () => {
    setValue("");
    setNewElement(true);
    setOpen(true);
  }

  const onOpenModalHandle = (id: number, value: string) => {
    setId(id);
    setValue(value);
    setOpen(true);
  }

  const onCloseModalHandle = async (e) => {
    e.preventDefault();
    setId(0);
    setValue("");
    setOpen(false);
    setNewElement(false);
    await loadItems();
  }

  return <div>
    <dialog open={open}>
      <article style={{width: 500, maxHeight: 700}}>
        <a href="#close"
          aria-label="Close"
          className="close"
          data-target="modal-example"
          aria-disabled={!value || updating}
          onClick={onCloseModalHandle}>
        </a>
        <div>
          <label htmlFor="name">
            Nazwa
            <input type="text" name="name" value={value} onChange={e => {e.preventDefault(); setValue(e.target.value)}} />
          </label>
          <button disabled={!value || updating} aria-busy={updating} onClick={async (e) => {e.preventDefault(); newElement ? await addItem(): await updateItem()}}>{newElement ? "Dodaj" : "Zaktualizuj"}</button>
        </div>
        <footer>
          <a href="#confirm"
            role="button"
            data-target="modal-example"
            aria-disabled={!value || updating}
            onClick={onCloseModalHandle}>
            Zamknij
          </a>
        </footer>
      </article>
    </dialog>
    <h1>Zarządzanie kategoriami</h1>
    <button className="outline contrast" onClick={onOpenAddModalHandle}>Dodaj kategorię</button>
    {!loading ? <div>Loading...</div>
      : <figure>
          <table>
            <thead>
              <tr>
                <th>Identyfikator</th>
                <th>Nazwa</th>
                <th>Data utworzenia</th>
                <th>Data edycji</th>
                <th>Edytuj</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {
                categories.map(({category_id, name, updatedAt, createdAt}) => (
                  <tr key={category_id}>
                    <th>{category_id}</th>
                    <th>{name}</th>
                    <th>{new Date(createdAt).toISOString().split("T")[0]}</th>
                    <th>{new Date(updatedAt).toISOString().split("T")[0]}</th>
                    <th><button style={{marginBottom: '0'}} className="outline" onClick={e => {e.preventDefault(); onOpenModalHandle(category_id, name)}}>Edytuj</button></th>
                    <th><button style={{marginBottom: '0'}} className="contrast outline" onClick={e => {e.preventDefault(); deleteItem(category_id)}}>Usuń</button></th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </figure>
    }
  </div>;
};

export default ModeratorCategories;
