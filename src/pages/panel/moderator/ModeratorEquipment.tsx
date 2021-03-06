import { useEffect, useState } from 'react';
import { IEquipment } from '../../../typescript/interfaces';
import API from '../../../utils/axios';
import { handleNotificationException, handleNotificationResponse } from '../../../utils/notifications';

const ModeratorEquipment = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [equipment, setEquipment] = useState<IEquipment[]>([])
  const [open, setOpen] = useState(false);
  const [newElement, setNewElement] = useState(false);
  const [id, setId] = useState(0);
  const [value, setValue] = useState("");

  const loadItems = async () => {
    setLoading(true);
    try {
        const res = await API.get<any>('/equipment');
        setEquipment(res.data.response.equipment as IEquipment[]);
      } catch(exc) {
        handleNotificationException(exc);
      }
      setLoading(true);
  }

  useEffect(() => {
    loadItems();
  }, [])


  const updateItem = async () => {
    setUpdating(true);
    try {
      const res = await API.post(`/equipment/${id}/update`, {name: value});
      handleNotificationResponse(res);
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc);
    }
    setUpdating(false)
  }

  const deleteItem = async (id: number) => {
    try {
      const res = await API.post(`/equipment/${id}/delete`);
      handleNotificationResponse(res)
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc);
    }
  }

  const addItem = async () => {
    setUpdating(true)
    try {
      const res = await API.post(`/equipment`, {name: value});
      handleNotificationResponse(res);
      await loadItems();
    } catch (exc) {
      handleNotificationException(exc);
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
    <h1>Zarz??dzanie sprz??tem</h1>
    <button className="outline contrast" onClick={onOpenAddModalHandle}>Dodaj sprz??t</button>
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
                <th>Usu??</th>
              </tr>
            </thead>
            <tbody>
              {
                equipment.map(({equipment_id, name, updatedAt, createdAt}) => (
                  <tr key={equipment_id}>
                    <th>{equipment_id}</th>
                    <th>{name}</th>
                    <th>{new Date(createdAt).toISOString().split("T")[0]}</th>
                    <th>{new Date(updatedAt).toISOString().split("T")[0]}</th>
                    <th><button style={{marginBottom: '0'}} className="outline" onClick={e => {e.preventDefault(); onOpenModalHandle(equipment_id, name)}}>Edytuj</button></th>
                    <th><button style={{marginBottom: '0'}} className="contrast outline" onClick={e => {e.preventDefault(); deleteItem(equipment_id)}}>Usu??</button></th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </figure>
    }
  </div>;
};

export default ModeratorEquipment;
