import { useEffect, useState } from 'react';
import { IMuscle } from '../../../typescript/interfaces';
import API from '../../../utils/axios';

const ModeratorMuscles = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [muscles, setMuscles] = useState<IMuscle[]>([])
  const [open, setOpen] = useState(false);
  const [newElement, setNewElement] = useState(false);
  const [id, setId] = useState(0);
  const [value, setValue] = useState("");

  const loadItems = async () => {
    setLoading(true);
    try {
        const res = await API.get<any>('/muscle');
        setMuscles(res.data.response.muscles as IMuscle[]);
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
      await API.post(`/muscle/${id}/update`, {name: value});
      alert("zaktualizowano element")
      await loadItems();
    } catch (exc) {
      console.log(exc.response);
    }
    setUpdating(false)
  }

  const deleteItem = async (id: number) => {
    try {
      await API.post(`/muscle/${id}/delete`);
      alert(`Usunięto element o id ${id}`);
      await loadItems();
    } catch (exc) {
      console.log(exc)
    }
  }

  const addItem = async () => {
    setUpdating(true)
    try {
      await API.post(`/muscle`, {name: value});
      alert(`Dodano element o nazwie ${value}`);
      await loadItems();
    } catch (exc) {
      console.log(exc)
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
          <button disabled={!value || updating} aria-busy={updating} onClick={e => {e.preventDefault(); newElement ? addItem(): updateItem()}}>{newElement ? "Dodaj" : "Zaktualizuj"}</button>
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
    <h1>Zarządzanie grupami mięśni</h1>
    <button className="outline contrast" onClick={onOpenAddModalHandle}>Dodaj grupę mięśniową</button>
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
                muscles.map(({muscle_id, name, updatedAt, createdAt}) => (
                  <tr key={muscle_id}>
                    <th>{muscle_id}</th>
                    <th>{name}</th>
                    <th>{new Date(createdAt).toISOString().split("T")[0]}</th>
                    <th>{new Date(updatedAt).toISOString().split("T")[0]}</th>
                    <th><button style={{marginBottom: '0'}} className="outline" onClick={e => {e.preventDefault(); onOpenModalHandle(muscle_id, name)}}>Edytuj</button></th>
                    <th><button style={{marginBottom: '0'}} className="contrast outline" onClick={e => {e.preventDefault(); deleteItem(muscle_id)}}>Usuń</button></th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </figure>
    }
  </div>;
};

export default ModeratorMuscles;
